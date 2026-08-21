import { describe, expect, it } from "vitest";

import { parseGiftRequest, ValidationFailure } from "../src/validation";

const validRequest = {
  name: "  Luca   B.  ",
  email: "  PERSONA@example.com ",
  birthday: "1980-05-12",
  newsletterConsent: true,
  turnstileToken: "turnstile-token-valid",
};

describe("gift request validation", () => {
  it("normalises safe form values", () => {
    expect(parseGiftRequest(validRequest)).toEqual({
      name: "Luca B.",
      email: "persona@example.com",
      birthday: "1980-05-12",
      newsletterConsent: true,
      turnstileToken: "turnstile-token-valid",
    });
  });

  it("defaults the optional newsletter consent to false", () => {
    const { newsletterConsent: _newsletterConsent, ...withoutConsent } = validRequest;
    expect(parseGiftRequest(withoutConsent).newsletterConsent).toBe(false);
  });

  it("rejects non-boolean newsletter consent values", () => {
    expect(() =>
      parseGiftRequest({ ...validRequest, newsletterConsent: "yes" }),
    ).toThrowError(ValidationFailure);
  });

  it("rejects invalid calendar dates", () => {
    expect(() =>
      parseGiftRequest({ ...validRequest, birthday: "2026-02-31" }),
    ).toThrowError(ValidationFailure);
  });

  it("accepts valid leap-year dates", () => {
    expect(
      parseGiftRequest({ ...validRequest, birthday: "2024-02-29" }).birthday,
    ).toBe("2024-02-29");
  });

  it("rejects email header injection", () => {
    expect(() =>
      parseGiftRequest({
        ...validRequest,
        email: "persona@example.com\r\nBcc: attacker@example.com",
      }),
    ).toThrowError(ValidationFailure);
  });
});
