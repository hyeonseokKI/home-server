"use client";

import { useRef } from "react";
import ImageSlider from "@/app/components/ImageSlider";
import Intro from "@/app/components/Intro";

type HomeContentProps = {
  images: string[];
};

export default function HomeContent({ images }: HomeContentProps) {
  const introSectionRef = useRef<HTMLElement>(null);

  const scrollToIntro = () => {
    if (introSectionRef.current) {
      const targetPosition = introSectionRef.current.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // 1.5초 동안 스크롤
      let start: number | null = null;

      // easing 함수 (ease-in-out)
      const easeInOutCubic = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full mx-4 md:mx-8 lg:mx-16">

      {/* ImageSlider - 모바일: 세로, 데스크톱(lg 이상): 좌측 */}
      <section
        className="
          flex
          flex-col
          lg:flex-[2]
          w-full
          lg:min-w-0
          min-h-screen
          lg:min-h-screen
          items-center
          justify-center
          relative
        "
      >
        <div className="w-full flex-shrink-0 flex flex-col items-center">
          <ImageSlider images={images} />
        </div>
        
        {/* 아래 화살표 - 화면 최하단에 배치, 모바일에서만 표시, 데스크톱에서는 숨김 */}
        <button
          onClick={scrollToIntro}
          className="lg:hidden absolute bottom-40 left-1/2 -translate-x-1/2 cursor-pointer pointer-events-auto z-10 flex-shrink-0"
          aria-label="아래로 스크롤"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-bounce text-white"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* Intro - 모바일: 하단, 데스크톱(lg 이상): 우측 */}
      <section
        ref={introSectionRef}
        className="
          flex
          flex-1
          w-full
          lg:min-w-0
          min-h-screen
          lg:min-h-screen
          items-center
          justify-center
          px-4 md:px-8
        "
      >
      <Intro />
      </section>
        
    </div>
  );
}

