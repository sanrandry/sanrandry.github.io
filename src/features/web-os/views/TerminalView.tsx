import type { PortfolioContent } from "../content";
import { Icon } from "../ui/Icon";
import { terminalReply } from "../model";
export function TerminalView({
  content,
  command,
  setCommand,
  history,
  onSubmit,
}: {
  content: PortfolioContent;
  command: string;
  setCommand: (command: string) => void;
  history: { input: string; output: string }[];
  onSubmit: () => void;
}) {
  const { say, lang } = content;
  return (
    <>
      <div className="content-eyebrow">
        {say("POUR LES CURIEUX", "FOR THE CURIOUS")}
      </div>
      <h1 tabIndex={-1} className="view-heading page-title">
        Hello, terminal.
      </h1>
      <p className="page-intro">
        {say(
          "Un autre chemin pour faire connaissance. Tapez help pour commencer.",
          "Another way to get to know me. Type help to get started.",
        )}
      </p>
      <div className="terminal-panel rounded-[9px] p-[23px]">
        <div className="terminal-welcome">
          Randry OS — {say("terminal de découverte", "discovery terminal")}
          <br />
          <span>{terminalReply("help", lang)}</span>
        </div>
        <div
          className="terminal-history"
          role="log"
          aria-label={say("Historique du terminal", "Terminal history")}
        >
          {history.map((entry, index) => (
            <div key={index}>
              <div className="terminal-prompt">
                randry ~ % <span>{entry.input}</span>
              </div>
              <pre>{entry.output}</pre>
            </div>
          ))}
        </div>
        <form
          className="flex items-center gap-2.5"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <label htmlFor="terminal-command">randry ~ %</label>
          <input
            id="terminal-command"
            value={command}
            maxLength={200}
            onChange={(event) => setCommand(event.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label={say("Commande", "Command")}
          />
          <button aria-label={say("Exécuter la commande", "Run command")}>
            <Icon name="arrow" size={18} />
          </button>
        </form>
      </div>
      <div className="terminal-hints mt-5 mb-[35px] flex flex-wrap gap-[9px]">
        {["whoami", "stack", "projects", "contact"].map((item) => (
          <button
            key={item}
            onClick={() => {
              setCommand(item);
              document.getElementById("terminal-command")?.focus();
            }}
          >
            {item}
            <span>↵</span>
          </button>
        ))}
      </div>
    </>
  );
}
