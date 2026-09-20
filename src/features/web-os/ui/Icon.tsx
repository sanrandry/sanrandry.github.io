import type { Page } from "../model";
export type IconName =
  | Page
  | "github"
  | "linkedin"
  | "arrow"
  | "download"
  | "sun"
  | "moon"
  | "code"
  | "globe"
  | "check"
  | "copy"
  | "external"
  | "power"
  | "grid"
  | "settings";
const paths: Record<IconName, string> = {
  power: "M12 2v10M6.3 5.3a9 9 0 1 0 11.4 0",
  grid: "M4 4h5v5H4ZM15 4h5v5h-5ZM4 15h5v5H4ZM15 15h5v5h-5Z",
  settings:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z",
  home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
  projects:
    "M3 7V5a2 2 0 0 1 2-2h5l3 3h6a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 1h18",
  experience: "M8 6V4h8v2M3 10h18M3 7h18v13H3Zm7 3v4h4v-4",
  about:
    "M20 21v-2a6 6 0 0 0-6-6h-4a6 6 0 0 0-6 6v2M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  contact: "M3 5h18v14H3Zm0 1 9 7 9-7",
  terminal: "m5 6 5 6-5 6m8 0h6",
  github:
    "M9 21v-4c-4 1-4-2-6-2m12 6v-4c0-1-.3-2-1-2.5 4-.5 6-2 6-5.5 0-1.5-.5-2.5-1.5-3.5.5-1 .5-2.5 0-3.5-2 0-3 1-4 1.5a13 13 0 0 0-5 0C8.5 3 7 2 5.5 2 5 3 5 4.5 5.5 5.5 4.5 6.5 4 7.5 4 9c0 3.5 2 5 6 5.5-.7.5-1 1.5-1 2.5",
  linkedin: "M4 9v12M4 4v.01M10 21V9h5v2c3-4 6-2 6 2v8M15 14v7",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
  sun: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  moon: "M21 13a9 9 0 0 1-10-10 9 9 0 1 0 10 10Z",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18",
  globe:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18M12 3a19 19 0 0 1 0 18 19 19 0 0 1 0-18",
  check: "m5 12 4 4L19 6",
  copy: "M8 8h13v13H8ZM16 8V3H3v13h5",
  external: "M14 3h7v7m0-7L10 14M10 3H3v18h18v-7",
};
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
