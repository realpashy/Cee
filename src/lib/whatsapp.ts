export type LeadWhatsappInput = {
  fullName: string;
  businessName: string;
  serviceInterest: string;
};

const DEFAULT_CEE_PHONE = "972502242816";

export function buildLeadWhatsappHref(input: LeadWhatsappInput) {
  const message = [
    "Hi Cee+, I just completed the eligibility form.",
    `My name is ${input.fullName}.`,
    `Business: ${input.businessName}.`,
    `Interested in: ${input.serviceInterest}.`
  ].join(" ");

  return `https://wa.me/${DEFAULT_CEE_PHONE}?text=${encodeURIComponent(message)}`;
}
