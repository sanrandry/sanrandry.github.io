import { useState, useEffect } from "react";
import type { Lang } from "@/lib/i18n";
export function Clock({
  lang,
  compact = false,
  dateOnly = false,
}: {
  lang: Lang;
  compact?: boolean;
  dateOnly?: boolean;
}) {
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setDate(new Date());
    update();
    const timer = setInterval(update, 30_000);
    return () => clearInterval(timer);
  }, []);
  return (
    <time className="desktop-clock" dateTime={date?.toISOString()}>
      {date?.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB", {
        ...(compact
          ? {}
          : {
              weekday: "short" as const,
              day: "numeric" as const,
              month: "short" as const,
            }),
        ...(!dateOnly
          ? { hour: "2-digit" as const, minute: "2-digit" as const }
          : {}),
      }) ?? "—"}
    </time>
  );
}
