import {
  buildGiftMessage,
  SMTP_USERNAME,
  utf8ToBase64,
  type GiftMessage,
} from "./message";
import type { Locale } from "./config";
import {
  expectCode,
  SmtpChannel,
  SmtpFailure,
  type SmtpResponse,
  withTimeout,
} from "./smtp-protocol";

export interface MailSocket {
  readable: ReadableStream<Uint8Array>;
  writable: WritableStream<Uint8Array>;
  opened: Promise<unknown>;
  startTls(): MailSocket;
  close(): Promise<void>;
}

function advertisedAuthMechanisms(response: SmtpResponse): Set<string> {
  const mechanisms = new Set<string>();

  for (const line of response.lines) {
    const match = /^250[ -]AUTH\s+(.+)$/i.exec(line);
    if (!match) {
      continue;
    }

    for (const mechanism of match[1].trim().split(/\s+/)) {
      mechanisms.add(mechanism.toUpperCase());
    }
  }

  return mechanisms;
}

async function authenticate(
  channel: SmtpChannel,
  ehloResponse: SmtpResponse,
  token: string,
): Promise<void> {
  const mechanisms = advertisedAuthMechanisms(ehloResponse);

  if (mechanisms.size === 0 || mechanisms.has("PLAIN")) {
    const payload = utf8ToBase64(`\u0000${SMTP_USERNAME}\u0000${token}`);
    let response = await channel.command(`AUTH PLAIN ${payload}`, "smtp-authentication");

    if (response.code === 334) {
      response = await channel.command(payload, "smtp-authentication-response");
    }

    expectCode(response, [235], "smtp-authentication");
    return;
  }

  if (mechanisms.has("LOGIN")) {
    let response = await channel.command("AUTH LOGIN", "smtp-authentication");
    expectCode(response, [334], "smtp-authentication");
    response = await channel.command(utf8ToBase64(SMTP_USERNAME), "smtp-authentication-username");
    expectCode(response, [334], "smtp-authentication-username");
    response = await channel.command(utf8ToBase64(token), "smtp-authentication-password");
    expectCode(response, [235], "smtp-authentication");
    return;
  }

  throw new SmtpFailure("smtp-authentication-mechanism-unavailable");
}

export async function runSmtpSession(
  initialSocket: MailSocket,
  recipient: string,
  name: string,
  locale: Locale,
  downloadUrl: string,
  smtpToken: string,
): Promise<{ messageId: string }> {
  return runSmtpMessageSession(
    initialSocket,
    recipient,
    buildGiftMessage({ recipient, name, locale, downloadUrl }),
    smtpToken,
  );
}

export async function runSmtpMessageSession(
  initialSocket: MailSocket,
  recipient: string,
  message: GiftMessage,
  smtpToken: string,
): Promise<{ messageId: string }> {
  if (!smtpToken || smtpToken.length > 1_024 || /[\r\n]/.test(smtpToken)) {
    throw new SmtpFailure("smtp-token-invalid");
  }

  let socket = initialSocket;
  let channel: SmtpChannel | undefined;

  try {
    await withTimeout(socket.opened, "tcp-connect");

    channel = new SmtpChannel(socket);
    expectCode(await channel.readResponse("smtp-greeting"), [220], "smtp-greeting");

    const initialEhlo = await channel.command("EHLO gipivisconti.com", "smtp-ehlo");
    expectCode(initialEhlo, [250], "smtp-ehlo");

    if (!initialEhlo.lines.some((line) => /\bSTARTTLS\b/i.test(line))) {
      throw new SmtpFailure("smtp-starttls-unavailable");
    }

    expectCode(
      await channel.command("STARTTLS", "smtp-starttls"),
      [220],
      "smtp-starttls",
    );

    channel.release();
    channel = undefined;
    socket = socket.startTls();
    await withTimeout(socket.opened, "tls-connect");

    channel = new SmtpChannel(socket);
    const secureEhlo = await channel.command("EHLO gipivisconti.com", "smtp-secure-ehlo");
    expectCode(secureEhlo, [250], "smtp-secure-ehlo");
    await authenticate(channel, secureEhlo, smtpToken);

    expectCode(
      await channel.command(`MAIL FROM:<${SMTP_USERNAME}>`, "smtp-mail-from"),
      [250],
      "smtp-mail-from",
    );
    expectCode(
      await channel.command(`RCPT TO:<${recipient}>`, "smtp-recipient"),
      [250, 251],
      "smtp-recipient",
    );
    expectCode(await channel.command("DATA", "smtp-data"), [354], "smtp-data");

    await channel.writeMessage(message.source);
    expectCode(await channel.readResponse("smtp-message-accepted"), [250], "smtp-message-accepted");

    try {
      const quitResponse = await channel.command("QUIT", "smtp-quit");
      expectCode(quitResponse, [221], "smtp-quit");
    } catch {
      // Il server ha già accettato il messaggio; un errore durante QUIT non invalida l'invio.
    }

    return { messageId: message.messageId };
  } finally {
    if (channel) {
      try {
        channel.release();
      } catch {
        // La connessione potrebbe essere già chiusa.
      }
    }

    try {
      await socket.close();
    } catch {
      // Nessun dato sensibile viene registrato durante la chiusura.
    }
  }
}
