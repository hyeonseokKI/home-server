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
      introSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-full mx-4 md:mx-8 lg:mx-16">

      {/* ImageSlider - 모바일에서는 위, 데스크톱에서는 왼쪽 */}
      <section
        className="
          flex
          flex-col
          lg:flex-[2]
          w-full
          lg:min-w-0
          mb-8 lg:mb-0
          min-h-[100vh] lg:min-h-0
          items-center
          justify-center
          relative
        "
      >
        <div className="w-full flex-shrink-0 flex flex-col items-center">
          <ImageSlider images={images} />
          
          {/* 아래 화살표 - 모든 화면에서 표시, ImageSlider 섹션 바로 아래 */}
          <button
            onClick={scrollToIntro}
            className="mt-6 mb-4 cursor-pointer pointer-events-auto z-10 flex-shrink-0"
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
        </div>
      </section>

      {/* Intro - 모바일에서는 아래, 데스크톱에서는 오른쪽 */}
      <section
        ref={introSectionRef}
        className="
          flex
          flex-1
          w-full
          min-w-0
          items-center
          justify-center
          px-4 md:px-8
          min-h-[100vh] lg:min-h-0
        "
      >
      <Intro />
      </section>
        
    </div>
  );
}

