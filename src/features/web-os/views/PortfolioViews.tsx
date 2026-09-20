import { useState } from "react";
import type { Page } from "../model";
import { terminalReply } from "../model";
import type { PortfolioContent } from "../content";
import { HomeView } from "./HomeView";
import { ProjectsView } from "./ProjectsView";
import { ExperienceView } from "./ExperienceView";
import { AboutView } from "./AboutView";
import { ContactView } from "./ContactView";
import { TerminalView } from "./TerminalView";

export function PortfolioViews({
  content,
  page,
  motion,
  navigate,
  showProject,
}: {
  content: PortfolioContent;
  page: Page;
  motion: boolean;
  navigate: (page: Page) => void;
  showProject: (index: number) => void;
}) {
  const { lang } = content;
  // Keep visit-scoped state here: changing a view must not erase terminal history or copy feedback.
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<{ input: string; output: string }[]>(
    [],
  );
  const [copyStatus, setCopyStatus] = useState<"" | "copied" | "failed">("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("sinrandry@gmail.com");
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  function submitCommand() {
    if (!command.trim()) return;
    if (command.trim().toLowerCase() === "clear") setHistory([]);
    else
      setHistory((previous) => [
        ...previous.slice(-39),
        { input: command, output: terminalReply(command, lang) },
      ]);
    setCommand("");
  }
  return (
    <div className="view-content" key={page}>
      {page === "home" && (
        <HomeView
          content={content}
          motion={motion}
          navigate={navigate}
          showProject={showProject}
        />
      )}
      {page === "projects" && (
        <ProjectsView content={content} showProject={showProject} />
      )}
      {page === "experience" && <ExperienceView content={content} />}
      {page === "about" && <AboutView content={content} />}
      {page === "contact" && (
        <ContactView
          content={content}
          copyStatus={copyStatus}
          copyEmail={copyEmail}
        />
      )}
      {page === "terminal" && (
        <TerminalView
          content={content}
          command={command}
          setCommand={setCommand}
          history={history}
          onSubmit={submitCommand}
        />
      )}
    </div>
  );
}
