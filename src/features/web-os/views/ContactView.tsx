import type { PortfolioContent } from "../content";
import { Icon } from "../ui/Icon";
export function ContactView({
  content,
  copyStatus,
  copyEmail,
}: {
  content: PortfolioContent;
  copyStatus: "" | "copied" | "failed";
  copyEmail: () => void;
}) {
  const { say, t } = content;
  return (
    <section className="contact-view flex flex-col items-center pt-6 pb-[45px] text-center">
      <span className="contact-symbol mt-[15px] mb-8 grid size-[86px] place-items-center">
        <Icon name="contact" size={44} />
      </span>
      <span className="availability">
        <i />
        {say("DISPONIBLE POUR DE NOUVEAUX PROJETS", "OPEN TO NEW PROJECTS")}
      </span>
      <h1 tabIndex={-1} className="view-heading page-title">
        {say("La suite s’écrit", "The next chapter")}
        <br />
        <span>{say("ensemble.", "starts together.")}</span>
      </h1>
      <p>{t.contact.description}</p>
      <a
        className="contact-email my-[25px] flex items-center gap-[13px]"
        href="mailto:sinrandry@gmail.com"
      >
        sinrandry@gmail.com
        <Icon name="arrow" />
      </a>
      <div className="contact-actions flex items-center gap-5">
        <a className="primary-button" href="mailto:sinrandry@gmail.com">
          {say("Écrivez-moi", "Get in touch")}
          <Icon name="external" size={16} />
        </a>
        <button className="text-button" onClick={copyEmail}>
          <Icon name="copy" size={15} />
          {say("Copier l’adresse", "Copy email")}
        </button>
      </div>
      <p className="copy-status my-2 min-h-6" role="status">
        {copyStatus === "copied"
          ? say("Adresse copiée !", "Email copied!")
          : copyStatus === "failed"
            ? say(
                "Copie indisponible. Sélectionnez l’adresse ci-dessus.",
                "Copy unavailable. Select the email address above.",
              )
            : ""}
      </p>
      <div className="contact-socials flex gap-[25px]">
        <a href="https://github.com/sanrandry" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a
          href="https://www.linkedin.com/in/randry-santatraina-sitraka-131415168/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn ↗
        </a>
        <a href="/CV.pdf" target="_blank" rel="noreferrer">
          {say("Mon CV", "My resume")} ↗
        </a>
      </div>
    </section>
  );
}
