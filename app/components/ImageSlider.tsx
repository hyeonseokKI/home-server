"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const images = [
  "/images/gate_1.jpg",
  "/images/gate_2.jpg",
  "/images/gate_3.jpg",
];

const AUTO_INTERVAL = 3000;
const RESUME_DELAY = 5000;
const SWIPE_THRESHOLD = 50;

type SliderMode = "auto" | "manual";

export default function ImageSlider() {
  const len = images.length;

  const extended = useMemo(
    () => [images[len - 1], ...images, images[0]],
    [len]
  );

  const [index, setIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mode, setMode] = useState<SliderMode>("auto");

  const startX = useRef<number | null>(null);
  const autoTimer = useRef<NodeJS.Timeout | null>(null);
  const resumeTimer = useRef<NodeJS.Timeout | null>(null);

  /* =========================
     🔔 Console Logger
  ========================== */
  const log = (msg: string) => {
    console.log(
      "%c[ImageSlider] : " + msg,
      "color:#22c55e;font-weight:bold;"
    );
  };

  /* =========================
     🔁 Mode Control
  ========================== */
  const enterManualMode = (reason: string) => {
    if (mode === "manual") return;

    log(`MANUAL MODE (${reason})`);
    setMode("manual");
  };

  const scheduleAutoResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);

    resumeTimer.current = setTimeout(() => {
      log("AUTO MODE RESUMED");
      setMode("auto");
    }, RESUME_DELAY);
  };

  /* =========================
     🔀 Move Logic
  ========================== */
  const move = (dir: 1 | -1, reason: string) => {
    if (isAnimating) return;

    enterManualMode(reason);
    scheduleAutoResume();

    log(dir === 1 ? "NEXT (manual)" : "PREV (manual)");

    setIsAnimating(true);
    setWithTransition(true);
    setIndex((prev) => prev + dir);
  };

  const goTo = (target: number) => {
    if (isAnimating) return;

    enterManualMode("DOT");
    scheduleAutoResume();

    log(`DOT → ${target + 1}`);

    setIsAnimating(true);
    setWithTransition(true);
    setIndex(target + 1);
  };

  /* =========================
     🖐 Swipe
  ========================== */
  const onStart = (x: number) => {
    startX.current = x;
  };

  const onEnd = (x: number) => {
    if (startX.current === null) return;

    const diff = x - startX.current;

    if (diff > SWIPE_THRESHOLD) move(-1, "SWIPE");
    else if (diff < -SWIPE_THRESHOLD) move(1, "SWIPE");

    startX.current = null;
  };

  /* =========================
     🎞 Transition End
  ========================== */
  const onTransitionEnd = () => {
    setIsAnimating(false);

    if (index === 0) {
      setWithTransition(false);
      setIndex(len);
      return;
    }

    if (index === len + 1) {
      setWithTransition(false);
      setIndex(1);
    }
  };

  useEffect(() => {
    if (!withTransition) {
      requestAnimationFrame(() => setWithTransition(true));
    }
  }, [withTransition]);

  /* =========================
     ⏱ Auto Slide
  ========================== */
  useEffect(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);

    if (mode === "auto") {
      autoTimer.current = setInterval(() => {
        if (!isAnimating) {
          setIndex((prev) => prev + 1);
        }
      }, AUTO_INTERVAL);
    }

    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [mode, isAnimating]);

  const realIndex = (index - 1 + len) % len;

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={(e) => onStart(e.clientX)}
      onMouseUp={(e) => onEnd(e.clientX)}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
    >
      <div
        className={`flex h-full ${
          withTransition ? "transition-transform duration-500 ease-out" : ""
        }`}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={onTransitionEnd}
      >
        {extended.map((src, i) => (
          <div key={i} className="relative w-full h-full flex-shrink-0">
            <Image
              src={src}
              alt=""
              fill
              draggable={false}
              className="object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* Dot */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full ${
              i === realIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
