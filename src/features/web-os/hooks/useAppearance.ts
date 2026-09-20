import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

export function useAppearance() {
  const [lang, setLang] = useState<Lang>("fr");
  const [dark, setDark] = useState(false);
  const [motion, setMotion] = useState(true);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return { lang, setLang, dark, setDark, motion, setMotion };
}
export type Appearance = ReturnType<typeof useAppearance>;
