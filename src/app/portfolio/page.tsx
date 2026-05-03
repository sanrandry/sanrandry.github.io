"use client";

import OriginalPortfolio from "@/components/OriginalPortfolio";
import { LanguageProvider } from "@/context/LanguageContext";

export default function PortfolioPage() {
  return (
    <LanguageProvider>
      <OriginalPortfolio />
    </LanguageProvider>
  );
}
