import type { GiftRequestInput } from "./types";

const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export class ValidationFailure extends Error {
  constructor(public readonly field: string) {
    super(`invalid-${field}`);
    this.name = "ValidationFailure";
  }
}

function cleanName(value: unknown): string {
  if (typeof value !== "string") throw new ValidationFailure("name");
  const name = value.trim().replace(/\s+/g, " ");
  if (name.length < 1 || name.length > 80 || /[\u0000-\u001f\u007f]/.test(name)) {
    throw new ValidationFailure("name");
  }
  return name;
}

function cleanEmail(value: unknown): string {
  if (typeof value !== "string") throw new ValidationFailure("email");
  const email = value.trim().toLowerCase();
  if (email.length > 254 || /[\r\n]/.test(email) || !EMAIL_PATTERN.test(email)) {
    throw new ValidationFailure("email");
  }
  return email;
}

function cleanBirthday(value: unknown): string {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) {
    throw new ValidationFailure("birthday");
  }
  const date = new Date(`${value}T00:00:00Z`);
  const minimum = new Date("1900-01-01T00:00:00Z");
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  if (
    Number.isNaN(date.getTime()) ||
    date < minimum ||
    date >= tomorrow ||
    date.toISOString().slice(0, 10) !== value
  ) {
    throw new ValidationFailure("birthday");
  }
  return value;
}

function cleanTurnstileToken(value: unknown): string {
  if (typeof value !== "string" || value.length < 10 || value.length > 2_048 || /[\r\n]/.test(value)) {
    throw new ValidationFailure("turnstile");
  }
  return value;
}

function cleanNewsletterConsent(value: unknown): boolean {
  if (value === undefined) return false;
  if (typeof value !== "boolean") throw new ValidationFailure("newsletterConsent");
  return value;
}

export function parseGiftRequest(value: unknown): GiftRequestInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ValidationFailure("body");
  }

  const payload = value as Record<string, unknown>;
  return {
    name: cleanName(payload.name),
    email: cleanEmail(payload.email),
    birthday: cleanBirthday(payload.birthday),
    newsletterConsent: cleanNewsletterConsent(payload.newsletterConsent),
    turnstileToken: cleanTurnstileToken(payload.turnstileToken),
  };
}
