import type { Metadata } from "next";
import { SweetimeQuotationPage } from "@/components/quotation/sweetime-quotation-page";

export const metadata: Metadata = {
  title: "Sweetime Nof Hagalil | הצעת מחיר ותוכנית צמיחה | Cee+",
  description:
    "הצעת מחיר ותוכנית צמיחה ל-Sweetime נוף הגליל — פרסום ממומן, תוכן, AI, Growth Engine, WhatsApp ונאמנות לקוחות.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <SweetimeQuotationPage />;
}
