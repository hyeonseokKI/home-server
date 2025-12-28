"use client";

import { useState, useEffect, useRef } from "react";
import { PostMeta } from "@/lib/posts";
import BlogSlider from "./BlogSlider";

interface BlogSliderWithControlsProps {
  posts: PostMeta[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function BlogSliderWithControls({
  posts,
  autoPlay = true,
  autoPlayInterval = 5000,
}: BlogSliderWithControlsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const handleNextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  // 자동 재생
  useEffect(() => {
    if (!autoPlay || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay, autoPlayInterval, posts.length, isPaused]);

  if (posts.length === 0) return null;

  return (
    <div className="relative mb-12">
      {/* 컨트롤 버튼들 - 우측 상단 (슬라이더 위쪽) */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
        {/* 왼쪽 화살표 */}
        <button
          onClick={handlePrevSlide}
          className="p-2 rounded-lg bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm"
          aria-label="이전 슬라이드"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* 정지 버튼 */}
        <button
          onClick={togglePause}
          className="p-2 rounded-lg bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm"
          aria-label={isPaused ? "재생" : "정지"}
        >
          {isPaused ? (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>

        {/* 오른쪽 화살표 */}
        <button
          onClick={handleNextSlide}
          className="p-2 rounded-lg bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm"
          aria-label="다음 슬라이드"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        </div>
      </div>

      {/* 이미지 슬라이더 */}
      <BlogSlider
        posts={posts}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
        isPaused={isPaused}
        onPauseToggle={togglePause}
        onPrevSlide={handlePrevSlide}
        onNextSlide={handleNextSlide}
        currentSlide={currentSlide}
        direction={direction}
        onSlideChange={setCurrentSlide}
      />
    </div>
  );
}

