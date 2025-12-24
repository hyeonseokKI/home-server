"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const images = [
  "/images/gate_1.jpg",
  "/images/gate_2.jpg",
  "/images/gate_3.jpg",
];

const AUTO_INTERVAL = 3000;   // 자동 전환 주기
const RESUME_DELAY = 5000;    // hover 해제 후 자동 복귀
const SWIPE_THRESHOLD = 50;   // swipe 감도(px)

export default function ImageSlider() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const startX = useRef<number | null>(null);
  const resumeTimer = useRef<NodeJS.Timeout | null>(null);

  /* 슬라이드 이동 */
  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i + 1) % images.length);
  };

  /* 자동 슬라이드 */
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused]);

  /* hover 시 자동 정지 */
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const handleMouseLeave = () => {
    resumeTimer.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  };

  /* swipe 제어 */
  const onStart = (x: number) => {
    startX.current = x;
  };

  const onEnd = (x: number) => {
    if (startX.current === null) return;

    const diff = x - startX.current;

    if (diff > SWIPE_THRESHOLD) prev();
    if (diff < -SWIPE_THRESHOLD) next();

    startX.current = null;
  };

  return (
    <div
      className="
        relative
        w-full
        h-full
        overflow-hidden
        select-none
        cursor-grab
        active:cursor-grabbing
      "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={(e) => onStart(e.clientX)}
      onMouseUp={(e) => onEnd(e.clientX)}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
    >
      {/* 슬라이드 트랙 */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative w-full h-full flex-shrink-0"
          >
            <Image
              src={src}
              alt={`slide-${i}`}
              fill
              draggable={false}
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover select-none pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* 인디케이터 */}
      <div
        className="
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          flex
          gap-2
        "
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`
              w-3 h-3 rounded-full transition
              ${i === index ? "bg-white" : "bg-white/40"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
