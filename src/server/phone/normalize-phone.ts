export type NormalizedPhoneNumber = {
  originalPhoneInput: string;
  phoneE164: string;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizePhoneNumber(input: string): NormalizedPhoneNumber {
  const originalPhoneInput = input.trim();
  const digits = onlyDigits(originalPhoneInput);

  if (!digits) {
    throw new Error("Phone number is required.");
  }

  if (originalPhoneInput.startsWith("+")) {
    return { originalPhoneInput, phoneE164: `+${digits}` };
  }

  if (digits.startsWith("00")) {
    return { originalPhoneInput, phoneE164: `+${digits.slice(2)}` };
  }

  if (digits.startsWith("972")) {
    return { originalPhoneInput, phoneE164: `+${digits}` };
  }

  if (digits.startsWith("970")) {
    return { originalPhoneInput, phoneE164: `+${digits}` };
  }

  if (digits.startsWith("0")) {
    return { originalPhoneInput, phoneE164: `+972${digits.slice(1)}` };
  }

  return { originalPhoneInput, phoneE164: `+${digits}` };
}
