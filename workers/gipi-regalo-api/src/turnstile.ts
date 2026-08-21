interface TurnstileResponse {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
}

export async function verifyTurnstile(
  secret: string,
  token: string,
  remoteIp: string,
  allowedHostnames: string[],
): Promise<boolean> {
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });

  if (!response.ok) return false;
  const result = (await response.json()) as TurnstileResponse;

  return Boolean(
    result.success &&
      result.hostname &&
      allowedHostnames.includes(result.hostname.toLowerCase()) &&
      result.action === "gift_request",
  );
}
