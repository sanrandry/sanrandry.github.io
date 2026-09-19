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
