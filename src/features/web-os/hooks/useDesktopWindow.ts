import { useRef, useState, type PointerEvent } from "react";

export function useDesktopWindow() {
  const [maximized, setMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const drag = useRef<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    limitX: number;
    limitY: number;
  } | null>(null);

  function startDrag(event: PointerEvent<HTMLElement>) {
    if (
      maximized ||
      event.button !== 0 ||
      window.matchMedia(
        "(max-width: 767px), (max-width: 1024px) and (max-height: 500px) and (pointer: coarse)",
      ).matches ||
      (event.target as HTMLElement).closest("button,a,summary")
    )
      return;
    const frame = event.currentTarget.parentElement!;
    const bounds = frame.parentElement!.getBoundingClientRect();
    const box = frame.getBoundingClientRect();
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      startX: position.x,
      startY: position.y,
      limitX: Math.max(0, (bounds.width - box.width) / 2),
      limitY: Math.max(0, (bounds.height - box.height) / 2),
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveWindow(event: PointerEvent<HTMLElement>) {
    const d = drag.current;
    if (d)
      setPosition({
        x: Math.max(
          -d.limitX,
          Math.min(d.limitX, d.startX + event.clientX - d.x),
        ),
        y: Math.max(
          -d.limitY,
          Math.min(d.limitY, d.startY + event.clientY - d.y),
        ),
      });
  }

  function resetWindow() {
    setPosition({ x: 0, y: 0 });
    setMaximized(false);
  }
  function toggleMaximized() {
    setMaximized(!maximized);
    setPosition({ x: 0, y: 0 });
  }
  function stopDrag() {
    drag.current = null;
  }
  return {
    maximized,
    position,
    resetWindow,
    toggleMaximized,
    startDrag,
    moveWindow,
    stopDrag,
  };
}
export type DesktopWindow = ReturnType<typeof useDesktopWindow>;
