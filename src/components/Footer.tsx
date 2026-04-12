"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="text-center py-8 text-[#495670] text-xs font-mono">
      <p>{t.footer}</p>
    </footer>
  );
}
