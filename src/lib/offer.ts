export type OfferSummaryInput = {
  packageName: string;
  originalPrice: number;
  discountedPrice: number;
  bonuses: string[];
};

export function buildOfferSummary(input: OfferSummaryInput) {
  return {
    badge: `${input.packageName} now only ₪${input.discountedPrice}`,
    originalPriceLabel: `₪${input.originalPrice.toLocaleString("en-US")}`,
    discountedPriceLabel: `₪${input.discountedPrice.toLocaleString("en-US")}`,
    bonuses: input.bonuses
  };
}
