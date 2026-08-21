import { describe, expect, it } from "vitest";

import { decryptJson, encryptJson, randomToken, sha256Hex } from "../src/crypto";

describe("protected outbox data", () => {
  it("encrypts and decrypts a payload with a 256-bit key", async () => {
    const key = randomToken(32);
    const payload = { email: "persona@example.com", locale: "it" };
    const encrypted = await encryptJson(key, payload);

    expect(encrypted.encryptedPayload).not.toContain(payload.email);
    await expect(
      decryptJson(key, encrypted.encryptedPayload, encrypted.payloadIv),
    ).resolves.toEqual(payload);
  });

  it("creates non-reversible download token hashes", async () => {
    const token = randomToken();
    const hash = await sha256Hex(token);

    expect(token).toHaveLength(43);
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
    expect(hash).not.toContain(token);
  });
});
