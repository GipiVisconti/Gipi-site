const SMTP_TIMEOUT_MS = 15_000;
const MAX_RESPONSE_BUFFER = 64 * 1024;

export interface SocketStreams {
  readable: ReadableStream<Uint8Array>;
  writable: WritableStream<Uint8Array>;
}

export interface SmtpResponse {
  code: number;
  lines: string[];
}

export class SmtpFailure extends Error {
  constructor(
    public readonly stage: string,
    public readonly smtpCode?: number,
  ) {
    super(smtpCode ? `${stage}:${smtpCode}` : stage);
    this.name = "SmtpFailure";
  }
}

export class SmtpChannel {
  private readonly reader: ReadableStreamDefaultReader<Uint8Array>;
  private readonly writer: WritableStreamDefaultWriter<Uint8Array>;
  private readonly decoder = new TextDecoder();
  private readonly encoder = new TextEncoder();
  private buffer = "";

  constructor(socket: SocketStreams) {
    this.reader = socket.readable.getReader();
    this.writer = socket.writable.getWriter();
  }

  async readResponse(stage: string): Promise<SmtpResponse> {
    const lines: string[] = [];
    let code: number | undefined;

    while (true) {
      const line = await this.readLine(stage);
      const match = /^(\d{3})([ -])(.*)$/.exec(line);

      if (!match) {
        throw new SmtpFailure(`${stage}-invalid-response`);
      }

      const currentCode = Number(match[1]);
      if (code === undefined) {
        code = currentCode;
      } else if (currentCode !== code) {
        throw new SmtpFailure(`${stage}-mixed-response`, currentCode);
      }

      lines.push(line);
      if (match[2] === " ") {
        return { code: currentCode, lines };
      }
    }
  }

  async command(command: string, stage: string): Promise<SmtpResponse> {
    if (/\r|\n/.test(command)) {
      throw new SmtpFailure(`${stage}-invalid-command`);
    }

    await this.write(`${command}\r\n`, stage);
    return this.readResponse(stage);
  }

  async writeMessage(source: string): Promise<void> {
    const normalized = source.replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");
    await this.write(`${normalized}\r\n.\r\n`, "message-body");
  }

  release(): void {
    this.reader.releaseLock();
    this.writer.releaseLock();
  }

  private async readLine(stage: string): Promise<string> {
    while (true) {
      const newlineIndex = this.buffer.indexOf("\n");
      if (newlineIndex >= 0) {
        const rawLine = this.buffer.slice(0, newlineIndex);
        this.buffer = this.buffer.slice(newlineIndex + 1);
        return rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine;
      }

      const chunk = await withTimeout(this.reader.read(), stage);
      if (chunk.done) {
        throw new SmtpFailure(`${stage}-connection-closed`);
      }

      this.buffer += this.decoder.decode(chunk.value, { stream: true });
      if (this.buffer.length > MAX_RESPONSE_BUFFER) {
        throw new SmtpFailure(`${stage}-response-too-large`);
      }
    }
  }

  private async write(value: string, stage: string): Promise<void> {
    await withTimeout(this.writer.write(this.encoder.encode(value)), stage);
  }
}

export function expectCode(response: SmtpResponse, expected: number[], stage: string): void {
  if (!expected.includes(response.code)) {
    throw new SmtpFailure(stage, response.code);
  }
}

export async function withTimeout<T>(promise: Promise<T>, stage: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(
          () => reject(new SmtpFailure(`${stage}-timeout`)),
          SMTP_TIMEOUT_MS,
        );
      }),
    ]);
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  }
}
