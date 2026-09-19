export function normalizeSearch(value: string) {
  return value.trim().normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function terminalReply(input: string, lang: "fr" | "en") {
  const command = input.trim().toLowerCase();
  const fr = lang === "fr";
  // ponytail: intentional command allowlist, not a shell. Never execute user input.
  switch (command) {
    case "help":
      return "help · whoami · stack · projects · contact · clear";
    case "whoami":
      return `Santatraina Sitraka RANDRY — ${fr ? "Développeur Fullstack · Antananarivo, Madagascar" : "Fullstack developer · Antananarivo, Madagascar"}`;
    case "stack":
      return "Vue / Nuxt · React / Next.js · Node / Nest.js · .NET\nPostgreSQL · MongoDB · Docker · gRPC · GraphQL";
    case "projects":
      return "Promethee Earth Intelligence · Voakajy · Bbot · pazzirobotics · reffmedia · meetual.com · Facily Post France · Funeral Home Booking";
    case "contact":
      return "sinrandry@gmail.com\nhttps://github.com/sanrandry";
    case "clear":
      return "";
    case "":
      return "";
    default:
      return fr
        ? `Commande inconnue : ${input.trim()}. Tapez help.`
        : `Unknown command: ${input.trim()}. Type help.`;
  }
}
export type Experience = "apple" | "google";

export function parseExperience(value: unknown): Experience | null {
  return value === "apple" || value === "google" ? value : null;
}

export type Page = "home" | "projects" | "experience" | "about" | "contact" | "terminal";
export type PortfolioView = {
  page: Page;
  appOpen: boolean;
  overlay: "project" | "search" | "settings" | "experience" | null;
  project: number;
  depth: number;
};
export const initialView: PortfolioView = {
  page: "home", appOpen: false, overlay: null, project: 0, depth: 0,
};

export function parsePortfolioView(value: unknown, projectCount: number): PortfolioView | null {
  if (!value || typeof value !== "object") return null;
  const view = value as PortfolioView;
  if (
    !["home", "projects", "experience", "about", "contact", "terminal"].includes(view.page) ||
    typeof view.appOpen !== "boolean" ||
    ![null, "project", "search", "settings", "experience"].includes(view.overlay) ||
    !Number.isSafeInteger(view.project) || view.project < 0 || view.project >= projectCount ||
    !Number.isSafeInteger(view.depth) || view.depth < 0
  ) return null;
  return { page: view.page, appOpen: view.appOpen, overlay: view.overlay, project: view.project, depth: view.depth };
}
