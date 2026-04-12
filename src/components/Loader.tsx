"use client";

import { useEffect, useState } from "react";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHiding(true), 1800);
    const done = setTimeout(() => onDone(), 2300);
    return () => {
      clearTimeout(timer);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-white"
      style={{
        opacity: hiding ? 0 : 1,
        transition: "opacity 500ms cubic-bezier(0.645,0.045,0.355,1)",
        pointerEvents: hiding ? "none" : "auto",
      }}
    >
      <div
        style={{
          animation: "loaderPop 1.2s cubic-bezier(0.645,0.045,0.355,1) forwards",
        }}
      >
        {/* Hexagon SVG logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 115"
          width="80"
          height="92"
          fill="none"
        >
          <polygon
            points="50,5 95,27.5 95,87.5 50,110 5,87.5 5,27.5"
            stroke="#1da8c7"
            strokeWidth="5"
            fill="none"
            style={{
              strokeDasharray: 300,
              strokeDashoffset: 300,
              animation: "drawHex 1.2s cubic-bezier(0.645,0.045,0.355,1) forwards",
            }}
          />
          <text
            x="50"
            y="72"
            textAnchor="middle"
            fill="#1da8c7"
            fontFamily="var(--font-inknut), serif"
            fontWeight="600"
            fontSize="44"
            style={{
              opacity: 0,
              animation: "fadeIn 0.4s 0.9s cubic-bezier(0.645,0.045,0.355,1) forwards",
            }}
          >
            S
          </text>
        </svg>
      </div>

      <style>{`
        @keyframes drawHex {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes loaderPop {
          0% { transform: scale(0.8); opacity: 0; }
          40% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
