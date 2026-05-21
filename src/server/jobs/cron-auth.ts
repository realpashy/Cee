export function isValidCronRequest(request: Request, secret: string | undefined) {
  if (!secret) {
    return false;
  }

  const authorization = request.headers.get("authorization");
  const cronHeader = request.headers.get("x-cron-secret");

  return authorization === `Bearer ${secret}` || cronHeader === secret;
}
