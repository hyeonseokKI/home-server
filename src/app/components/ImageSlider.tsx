"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const AUTO_INTERVAL = 3000;
const RESUME_DELAY = 5000;
const SWIPE_THRESHOLD = 50;

type SliderMode = "auto" | "manual";

type ImageSliderProps = {
  images: string[];
};

export default function ImageSlider({ images }: ImageSliderProps) {
  const len = images.length;

  const extended = useMemo(
    () => [images[len - 1], ...images, images[0]],
    [len]
  );

  const [index, setIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mode, setMode] = useState<SliderMode>("auto");
  const [textVisible, setTextVisible] = useState(false);

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

    const diffX = x - startX.current;

    // 수평 스와이프 처리
    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      if (diffX > SWIPE_THRESHOLD) move(-1, "SWIPE");
      else if (diffX < -SWIPE_THRESHOLD) move(1, "SWIPE");
    }

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
     📝 Text Animation
  ========================== */
  useEffect(() => {
    // 컴포넌트 마운트 시에만 텍스트 애니메이션 1회 재생
    setTextVisible(true);
  }, []);

  /* =========================
     ⏱ Auto Slide
  ========================== */
  useEffect(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);

    if (mode === "auto") {
      autoTimer.current = setInterval(() => {
        if (!isAnimating) {
          setIsAnimating(true);
          setWithTransition(true);
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
      className="relative w-full aspect-video sm:aspect-video overflow-hidden select-none cursor-grab active:cursor-grabbing"
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
          <div key={i} className="relative w-full h-full flex-shrink-0 p-4 sm:p-6 md:p-8">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-[100%] h-[100%]">
                <Image
                  src={src}
                  alt=""
                  fill
                  draggable={false}
                  className="object-contain pointer-events-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none w-[90%] sm:w-auto px-4">
        <p 
          className={`text-white text-sm sm:text-base md:text-xl lg:text-2xl mb-2 sm:mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out whitespace-nowrap ${
            textVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-8'
          }`}
          style={{ transitionDelay: textVisible ? '0ms' : '0ms' }}
        >
          하드웨어와 소프트웨어를 연결하는
        </p>
        <p 
          className={`text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out whitespace-nowrap ${
            textVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-8'
          }`}
          style={{ transitionDelay: textVisible ? '200ms' : '0ms' }}
        >
          <span className="relative inline-block">
            <span className="relative">
              김현석
              <span 
                className={`absolute bottom-0 left-0 h-2 sm:h-3 bg-[#141937] -z-10 transition-all duration-1000 ease-out ${
                  textVisible ? 'w-full' : 'w-0'
                }`}
                style={{ transitionDelay: textVisible ? '400ms' : '0ms' }}
              ></span>
            </span>
            <span>입니다.</span>
          </span>
        </p>
        <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg mt-4 sm:mt-6 space-y-1 sm:space-y-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <p 
            className={`transition-all duration-700 ease-out whitespace-nowrap ${
              textVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-8'
            }`}
            style={{ transitionDelay: textVisible ? '400ms' : '0ms' }}
          >
            임베디드 개발자를 희망하고 있습니다.
          </p>
          <p 
            className={`transition-all duration-700 ease-out whitespace-nowrap ${
              textVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-8'
            }`}
            style={{ transitionDelay: textVisible ? '600ms' : '0ms' }}
          >
            하드웨어를 이해하고 최적화된 코드로 제어하는 것을 좋아합니다.
          </p>
          <p 
            className={`transition-all duration-700 ease-out whitespace-nowrap ${
              textVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-8'
            }`}
            style={{ transitionDelay: textVisible ? '800ms' : '0ms' }}
          >
            실제 동작하는 시스템을 만드는 것에 열정을 가지고 있습니다.
          </p>
        </div>
      </div>

      {/* Dot */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              i === realIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
