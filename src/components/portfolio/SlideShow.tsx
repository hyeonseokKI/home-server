"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Slide {
  id: string;
  title?: string;
  content: React.ReactNode;
  background?: string;
}

interface SlideShowProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function SlideShow({
  slides,
  autoPlay = false,
  autoPlayInterval = 5000,
}: SlideShowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      exitFullscreen();
    }
  }, [isFullscreen, exitFullscreen]);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "Escape") {
        if (isFullscreen) {
          exitFullscreen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, nextSlide, prevSlide, toggleFullscreen, exitFullscreen]);

  // 자동 재생
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isFullscreen);
      
      // 전체화면일 때 body에 클래스 추가/제거
      if (isFullscreen) {
        document.body.classList.add("portfolio-fullscreen");
      } else {
        document.body.classList.remove("portfolio-fullscreen");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      // 컴포넌트 언마운트 시 클래스 제거
      document.body.classList.remove("portfolio-fullscreen");
    };
  }, []);

  // 마우스 움직임 감지 및 컨트롤 자동 숨김
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      // 기존 타이머가 있으면 클리어
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
      
      // 1초 후 컨트롤 숨김
      mouseTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    };

    // 초기 타이머 설정
    mouseTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, []);

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      {/* 슬라이드 컨테이너 */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center p-8 md:p-16 rounded-lg shadow-2xl"
            style={{
              background: slides[currentSlide].background || "var(--background)",
            }}
          >
            <div
              className={`w-full max-w-6xl mx-auto ${
                slides[currentSlide].background
                  ? "text-white"
                  : "text-foreground"
              }`}
            >
              {slides[currentSlide].title && (
                <h2
                  className={`text-4xl md:text-6xl font-bold mb-8 text-center ${
                    slides[currentSlide].background
                      ? "text-white"
                      : "text-foreground"
                  }`}
                >
                  {slides[currentSlide].title}
                </h2>
              )}
              <div
                className={`text-lg md:text-xl leading-relaxed ${
                  slides[currentSlide].background
                    ? "text-white"
                    : "text-foreground"
                }`}
              >
                {slides[currentSlide].content}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 네비게이션 버튼 */}
      <AnimatePresence>
        {showControls && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40 transition-colors backdrop-blur-sm"
            aria-label="이전 슬라이드"
          >
            <svg
              className="w-6 h-6 text-foreground"
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
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showControls && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40 transition-colors backdrop-blur-sm"
            aria-label="다음 슬라이드"
          >
            <svg
              className="w-6 h-6 text-foreground"
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
          </motion.button>
        )}
      </AnimatePresence>

      {/* 슬라이드 인디케이터 */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/50 hover:bg-muted-foreground"
                }`}
                aria-label={`슬라이드 ${index + 1}로 이동`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 슬라이드 번호 및 컨트롤 */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-8 right-8 z-10 flex items-center gap-2"
          >
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40 transition-colors backdrop-blur-sm"
              aria-label="전체화면 토글"
            >
              {isFullscreen ? (
                <svg
                  className="w-5 h-5 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              )}
            </button>
            <div className="px-4 py-2 rounded-lg bg-black/20 dark:bg-white/20 backdrop-blur-sm text-sm font-medium">
              {currentSlide + 1} / {slides.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 키보드 단축키 안내 (처음 3초만 표시) */}
      <KeyboardHint />
    </div>
  );
}

function KeyboardHint() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-lg bg-black/60 dark:bg-white/60 backdrop-blur-sm text-xs text-white dark:text-black"
    >
      <div className="flex items-center gap-4">
        <span>← → 화살표 키로 이동</span>
        <span>•</span>
        <span>F 전체화면</span>
        <span>•</span>
        <span>ESC 종료</span>
      </div>
    </motion.div>
  );
}

