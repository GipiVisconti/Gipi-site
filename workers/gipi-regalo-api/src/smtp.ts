import { connect } from "cloudflare:sockets";

import { runSmtpSession, type MailSocket } from "./smtp-session";
import type { Locale } from "./config";

export { SmtpFailure } from "./smtp-protocol";

const SMTP_HOST = "smtp.protonmail.ch";
const SMTP_PORT = 587;

export async function sendProtonGiftEmail(
  recipient: string,
  name: string,
  locale: Locale,
  downloadUrl: string,
  smtpToken: string,
): Promise<{ messageId: string }> {
  const socket = connect(
    { hostname: SMTP_HOST, port: SMTP_PORT },
    { secureTransport: "starttls", allowHalfOpen: false },
  );

  return runSmtpSession(socket as MailSocket, recipient, name, locale, downloadUrl, smtpToken);
}
