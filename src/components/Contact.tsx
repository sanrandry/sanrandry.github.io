"use client";

import { useReveal } from "@/hooks/useReveal";

const EASING = "cubic-bezier(0.645,0.045,0.355,1)";

export default function Contact() {
  const content = useReveal(0);

  return (
    <section id="contact" className="py-40 flex flex-col items-center text-center">
      <div ref={content.ref} style={content.style} className="flex flex-col items-center gap-6 max-w-2xl">
        <span className="text-[#495670] text-sm font-mono">04. What&apos;s Next?</span>

        <h2 className="text-[#022558] text-6xl font-bold leading-tight">
          Get In Touch
        </h2>

        <p className="text-[#495670] text-lg leading-relaxed">
          Although I&apos;m not currently looking for any new opportunities, my inbox is
          always open. Whether you have a question or just want to say hi, I&apos;ll try
          my best to get back to you!
        </p>

        <a
          href="mailto:hello@example.com"
          className="mt-4 border border-[#1da8c7] text-[#1da8c7] text-sm font-mono px-8 py-5 rounded hover:bg-[#1da8c7]/10"
          style={{ transition: `background-color 250ms ${EASING}` }}
        >
          Say Hello!
        </a>
      </div>
    </section>
  );
}
