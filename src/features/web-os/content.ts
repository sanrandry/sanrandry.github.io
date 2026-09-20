import { translations, type Lang } from "../../lib/i18n.ts";
import type { Page } from "./model";

export const projectTech = [
  ["Vue.js", ".NET 6", "gRPC", "PostgreSQL"],
  ["Next.js", "Nest.js", "Prisma", "MongoDB"],
  ["Vue.js", "Quasar", ".NET 6", "Blazor"],
  ["React", ".NET 5", "Keycloak"],
  ["Vue.js", "TypeGraphQL", "RabbitMQ"],
  ["TypeGraphQL", "Prisma", "PostgreSQL"],
  ["React Native", "Nest.js", "MySQL"],
  ["Next.js", "Bootstrap", "Redux"],
];

// ponytail: static portfolio data, no repository layer without an external data source.
export function getPortfolioContent(lang: Lang) {
  const t = translations[lang];
  const say = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const names: Record<Page, string> = {
    home: say("Bienvenue", "Welcome"),
    projects: say("Projets", "Projects"),
    experience: say("Parcours", "Experience"),
    about: say("À propos", "About"),
    contact: "Contact",
    terminal: "Terminal",
  };
  const projects = [...t.work.projects, ...t.projects.items];
  const mobileApps: Page[] = [
    "home",
    "projects",
    "experience",
    "about",
    "terminal",
    "contact",
  ];
  const appName = (item: Page) => (item === "home" ? "Portfolio" : names[item]);

  return { lang, t, say, names, projects, mobileApps, appName };
}
export type PortfolioContent = ReturnType<typeof getPortfolioContent>;
