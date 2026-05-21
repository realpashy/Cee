export type CaptureRateLimitInput = {
  ip: string;
  phoneE164: string;
};

export type RepeatedSubmissionInput = {
  lastSubmittedAt: Date | null;
  now?: Date;
  windowMinutes: number;
};

export function buildCaptureRateLimitKeys(input: CaptureRateLimitInput) {
  return {
    ipKey: `public-capture:ip:${input.ip}`,
    phoneKey: `public-capture:phone:${input.phoneE164}`
  };
}

export function detectHoneypotSubmission(value: string | null | undefined) {
  return Boolean(value?.trim());
}

export function shouldBlockRepeatedSubmission({
  lastSubmittedAt,
  now = new Date(),
  windowMinutes
}: RepeatedSubmissionInput) {
  if (!lastSubmittedAt) {
    return false;
  }

  const elapsedMs = now.getTime() - lastSubmittedAt.getTime();
  return elapsedMs >= 0 && elapsedMs < windowMinutes * 60 * 1000;
}

export function getRequestIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}
