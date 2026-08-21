import { describe, expect, it } from "vitest";

import { runSmtpSession, type MailSocket } from "../src/smtp-session";

const encoder = new TextEncoder();

class ScriptedSocket implements MailSocket {
  readonly opened = Promise.resolve({});
  readonly writes: string[] = [];
  readonly readable: ReadableStream<Uint8Array>;
  readonly writable: WritableStream<Uint8Array>;
  closed = false;
  startTlsCalled = false;
  private controller!: ReadableStreamDefaultController<Uint8Array>;

  constructor(
    private readonly onWrite: (value: string, socket: ScriptedSocket) => void,
    private readonly tlsSocket?: ScriptedSocket,
    greeting?: string,
  ) {
    this.readable = new ReadableStream<Uint8Array>({
      start: (controller) => {
        this.controller = controller;
        if (greeting) {
          this.enqueue(greeting);
        }
      },
    });
    this.writable = new WritableStream<Uint8Array>({
      write: (chunk) => {
        const value = new TextDecoder().decode(chunk);
        this.writes.push(value);
        this.onWrite(value, this);
      },
    });
  }

  enqueue(value: string, fragments?: number[]): void {
    let offset = 0;
    for (const length of fragments ?? [value.length]) {
      this.controller.enqueue(encoder.encode(value.slice(offset, offset + length)));
      offset += length;
    }
    if (offset < value.length) {
      this.controller.enqueue(encoder.encode(value.slice(offset)));
    }
  }

  startTls(): MailSocket {
    this.startTlsCalled = true;
    if (!this.tlsSocket) {
      throw new Error("missing-tls-socket");
    }
    return this.tlsSocket;
  }

  async close(): Promise<void> {
    this.closed = true;
  }
}

function successfulSocketPair(): { initial: ScriptedSocket; secure: ScriptedSocket } {
  const secure = new ScriptedSocket((value, socket) => {
    if (value === "EHLO gipivisconti.com\r\n") {
      socket.enqueue("250-proton.example\r\n250-AUTH PLAIN LOGIN\r\n250 SIZE 1000000\r\n", [7, 3, 11]);
    } else if (value.startsWith("AUTH PLAIN ")) {
      socket.enqueue("235 2.7.0 Authentication successful\r\n");
    } else if (value.startsWith("MAIL FROM:")) {
      socket.enqueue("250 2.1.0 Sender OK\r\n");
    } else if (value.startsWith("RCPT TO:")) {
      socket.enqueue("250 2.1.5 Recipient OK\r\n");
    } else if (value === "DATA\r\n") {
      socket.enqueue("354 End data with <CR><LF>.<CR><LF>\r\n");
    } else if (value.endsWith("\r\n.\r\n")) {
      socket.enqueue("250 2.0.0 Message accepted\r\n");
    } else if (value === "QUIT\r\n") {
      socket.enqueue("221 2.0.0 Bye\r\n");
    }
  });

  const initial = new ScriptedSocket(
    (value, socket) => {
      if (value === "EHLO gipivisconti.com\r\n") {
        socket.enqueue("250-proton.example\r\n250-STARTTLS\r\n250 SIZE 1000000\r\n", [2, 1, 9, 4]);
      } else if (value === "STARTTLS\r\n") {
        socket.enqueue("220 2.0.0 Ready to start TLS\r\n");
      }
    },
    secure,
    "220 proton.example ESMTP ready\r\n",
  );

  return { initial, secure };
}

describe("SMTP session", () => {
  it("handles fragmented multiline responses and completes STARTTLS before AUTH", async () => {
    const { initial, secure } = successfulSocketPair();

    await expect(
      runSmtpSession(
        initial,
        "persona@example.com",
        "Luca",
        "it",
        "https://example.com/d/token",
        "smtp-token-test",
      ),
    ).resolves.toEqual({
      messageId: expect.stringMatching(/@gipivisconti\.com$/),
    });

    expect(initial.writes).toEqual(["EHLO gipivisconti.com\r\n", "STARTTLS\r\n"]);
    expect(initial.startTlsCalled).toBe(true);
    expect(secure.writes[0]).toBe("EHLO gipivisconti.com\r\n");
    expect(secure.writes.some((value) => value.startsWith("AUTH PLAIN "))).toBe(true);
    expect(secure.writes.some((value) => value.endsWith("\r\n.\r\n"))).toBe(true);
    expect(secure.closed).toBe(true);
  });

  it("refuses to authenticate when STARTTLS is not advertised", async () => {
    const initial = new ScriptedSocket(
      (value, socket) => {
        if (value === "EHLO gipivisconti.com\r\n") {
          socket.enqueue("250-proton.example\r\n250 AUTH PLAIN LOGIN\r\n");
        }
      },
      undefined,
      "220 proton.example ESMTP ready\r\n",
    );

    await expect(
      runSmtpSession(
        initial,
        "persona@example.com",
        "Luca",
        "it",
        "https://example.com/d/token",
        "smtp-token-test",
      ),
    ).rejects.toMatchObject({ stage: "smtp-starttls-unavailable" });
    expect(initial.writes.join("")).not.toContain("AUTH");
    expect(initial.startTlsCalled).toBe(false);
    expect(initial.closed).toBe(true);
  });
});
