import { useRef, type PointerEvent } from "react";
import type { Lang } from "@/lib/i18n";
import { Icon } from "./Icon";
export function Sculpture({ motion, lang }: { motion: boolean; lang: Lang }) {
  const scene = useRef<HTMLDivElement>(null);
  function tilt(e: PointerEvent<HTMLDivElement>) {
    if (
      !motion ||
      e.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const box = e.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty(
      "--tilt-x",
      `${(e.clientY - box.top - box.height / 2) / 18}deg`,
    );
    scene.current?.style.setProperty(
      "--tilt-y",
      `${(e.clientX - box.left - box.width / 2) / 15}deg`,
    );
  }
  function reset() {
    scene.current?.style.setProperty("--tilt-x", "0deg");
    scene.current?.style.setProperty("--tilt-y", "0deg");
  }
  return (
    <div
      className="sculpture-scene"
      ref={scene}
      onPointerMove={tilt}
      onPointerLeave={reset}
      aria-hidden="true"
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="sculpture-shadow" />
      <span className="floating-tag tag-one">
        <span /> frontend
      </span>
      <span className="floating-tag tag-two">
        <Icon name="code" size={13} /> backend
      </span>
      <div className="sculpture">
        <div className="sculpture-turn">
          {["top", "middle", "bottom"].map((layer, index) => (
            <div className={`slab slab-${layer}`} key={layer}>
              <div className="slab-face slab-upper">
                {index === 0 ? (
                  <Icon name="code" size={64} />
                ) : (
                  <span className="chip-lines" />
                )}
              </div>
              <div className="slab-face slab-front" />
              <div className="slab-face slab-back" />
              <div className="slab-face slab-left" />
              <div className="slab-face slab-right" />
              <div className="slab-face slab-under" />
            </div>
          ))}
        </div>
      </div>
      <span className="scene-caption">
        <span className="tiny-cross">✧</span>{" "}
        {lang === "fr"
          ? "Une autre dimension du web."
          : "Another dimension of the web."}
      </span>
    </div>
  );
}
