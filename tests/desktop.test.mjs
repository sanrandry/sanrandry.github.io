import assert from "node:assert/strict";
import { terminalReply } from "../src/lib/desktop.ts";

assert.match(terminalReply("  WHOAMI  ", "fr"), /Santatraina/);
assert.match(terminalReply("whoami", "en"), /Fullstack developer/);
assert.match(terminalReply("stack", "fr"), /PostgreSQL/);
assert.match(terminalReply("projects", "fr"), /Voakajy/);
assert.match(terminalReply("contact", "en"), /sinrandry@gmail.com/);
assert.match(terminalReply("help", "fr"), /clear/);
assert.equal(terminalReply("clear", "fr"), "");
assert.equal(terminalReply("  ", "en"), "");
assert.match(
  terminalReply("<script>alert(1)</script>", "fr"),
  /Commande inconnue/,
);
assert.match(terminalReply("rm -rf /", "en"), /Unknown command/);
console.log(
  "Terminal checks passed: normalization, bilingual replies, empty input, command allowlist.",
);

// Keep the translated project collections aligned with the desktop's eight entries.
const { translations } = await import("../src/lib/i18n.ts");
for (const lang of ["fr", "en"]) {
  assert.equal(
    translations[lang].work.projects.length +
      translations[lang].projects.items.length,
    8,
  );
  assert.equal(translations[lang].experience.jobs.length, 5);
  assert.match(translations[lang].about.p1, /Santatraina Sitraka RANDRY/);
}
assert.equal(translations.fr.experience.jobs[0].company, "Freelance");
assert.match(terminalReply("projects", "en"), /Funeral Home Booking/);
console.log(
  "Content checks passed: FR/EN project and experience parity, identity retained.",
);

// Spotlight search ignores casing and accents without interpreting query text as code or a regex.
const { normalizeSearch } = await import("../src/lib/desktop.ts");
assert.equal(normalizeSearch("  À PROPOS  "), "a propos");
assert.equal(
  normalizeSearch("Réservation Funérarium"),
  "reservation funerarium",
);
assert.equal(normalizeSearch(""), "");
assert.equal(normalizeSearch("É"), normalizeSearch("E\u0301"));
assert.equal(normalizeSearch("[.*]"), "[.*]");
assert.ok(
  normalizeSearch(translations.fr.projects.items[5].title).includes(
    normalizeSearch("FUNERARIUM"),
  ),
);
console.log(
  "iOS search checks passed: accents, case, Unicode normalization, empty and literal query.",
);

const { parseExperience } = await import("../src/lib/desktop.ts");
assert.equal(parseExperience("apple"), "apple");
assert.equal(parseExperience("google"), "google");
for (const invalid of [
  null,
  undefined,
  "",
  "android",
  "ios",
  "GOOGLE",
  {},
  1,
  "<script>",
]) {
  assert.equal(parseExperience(invalid), null);
}
console.log(
  "Experience checks passed: only persisted apple/google choices are accepted.",
);

const { initialView, parsePortfolioView } = await import("../src/lib/desktop.ts");
assert.deepEqual(parsePortfolioView(initialView, 8), initialView);
assert.deepEqual(parsePortfolioView({ ...initialView, page: "projects", overlay: "project", project: 7, depth: 2 }, 8),
  { ...initialView, page: "projects", overlay: "project", project: 7, depth: 2 });
for (const invalid of [null, {}, "projects", { ...initialView, page: "bad" },
  { ...initialView, appOpen: 1 }, { ...initialView, overlay: "bad" },
  { ...initialView, project: -1 }, { ...initialView, project: 8 },
  { ...initialView, project: 1.5 }, { ...initialView, depth: -1 },
  { ...initialView, depth: Infinity }, { ...initialView, depth: 0.1 }]) {
  assert.equal(parsePortfolioView(invalid, 8), null);
}
console.log("History state checks passed: validated views, overlays, project bounds and depth.");
