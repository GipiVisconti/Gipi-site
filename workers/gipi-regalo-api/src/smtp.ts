import { connect } from "cloudflare:sockets";

import {
  runSmtpMessageSession,
  runSmtpSession,
  type MailSocket,
} from "./smtp-session";
import type { Locale } from "./config";
import {
  buildAdminNotificationMessage,
  SMTP_USERNAME,
  type AdminNotificationMessageInput,
} from "./message";

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

export async function sendProtonAdminNotificationEmail(
  input: AdminNotificationMessageInput,
  smtpToken: string,
): Promise<{ messageId: string }> {
  const socket = connect(
    { hostname: SMTP_HOST, port: SMTP_PORT },
    { secureTransport: "starttls", allowHalfOpen: false },
  );
  const message = buildAdminNotificationMessage(input);

  return runSmtpMessageSession(
    socket as MailSocket,
    SMTP_USERNAME,
    message,
    smtpToken,
  );
}
