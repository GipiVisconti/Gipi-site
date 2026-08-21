export const BASE_SECURITY_HEADERS: Record<string, string> = {
  "Cache-Control": "no-store",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-Robots-Tag": "noindex, nofollow",
};

export function allowedOrigins(value: string): Set<string> {
  return new Set(
    value
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

export function corsHeaders(origin: string, configuredOrigins: string): Record<string, string> {
  if (!allowedOrigins(configuredOrigins).has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Expose-Headers": "Content-Disposition",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function jsonResponse(
  payload: unknown,
  status: number,
  origin: string,
  configuredOrigins: string,
): Response {
  return Response.json(payload, {
    status,
    headers: {
      ...BASE_SECURITY_HEADERS,
      ...corsHeaders(origin, configuredOrigins),
    },
  });
}

export function htmlResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      ...BASE_SECURITY_HEADERS,
      "Content-Security-Policy":
        "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
      "Content-Type": "text/html; charset=UTF-8",
    },
  });
}
