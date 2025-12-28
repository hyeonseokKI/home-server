"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PostMeta } from "@/lib/posts";

interface BlogSliderProps {
  posts: PostMeta[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  isPaused?: boolean;
  onPauseToggle?: () => void;
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
  currentSlide?: number;
  direction?: number;
  onSlideChange?: (slide: number) => void;
}

export default function BlogSlider({
  posts,
  autoPlay = true,
  autoPlayInterval = 5000,
  isPaused: externalIsPaused,
  onPauseToggle,
  onPrevSlide,
  onNextSlide,
  currentSlide: externalCurrentSlide,
  direction: externalDirection,
  onSlideChange,
}: BlogSliderProps) {
  const [internalCurrentSlide, setInternalCurrentSlide] = useState(0);
  const [internalDirection, setInternalDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isPaused = externalIsPaused !== undefined ? externalIsPaused : false;
  const currentSlide = externalCurrentSlide !== undefined ? externalCurrentSlide : internalCurrentSlide;
  const direction = externalDirection !== undefined ? externalDirection : internalDirection;

  const nextSlide = useCallback(() => {
    const newDirection = 1;
    const newSlide = (currentSlide + 1) % posts.length;
    if (externalCurrentSlide === undefined) {
      setInternalDirection(newDirection);
      setInternalCurrentSlide(newSlide);
    }
    onNextSlide?.();
    onSlideChange?.(newSlide);
  }, [posts.length, currentSlide, externalCurrentSlide, onNextSlide, onSlideChange]);

  const prevSlide = useCallback(() => {
    const newDirection = -1;
    const newSlide = (currentSlide - 1 + posts.length) % posts.length;
    if (externalCurrentSlide === undefined) {
      setInternalDirection(newDirection);
      setInternalCurrentSlide(newSlide);
    }
    onPrevSlide?.();
    onSlideChange?.(newSlide);
  }, [posts.length, currentSlide, externalCurrentSlide, onPrevSlide, onSlideChange]);

  // 자동 재생 (외부에서 currentSlide를 관리하지 않는 경우에만)
  useEffect(() => {
    if (externalCurrentSlide !== undefined) {
      // 외부에서 관리하는 경우 자동 재생은 외부에서 처리
      return;
    }

    if (!autoPlay || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setInternalDirection(1);
      setInternalCurrentSlide((prev) => (prev + 1) % posts.length);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay, autoPlayInterval, posts.length, isPaused, externalCurrentSlide]);

  if (posts.length === 0) return null;

  const currentPost = posts[currentSlide];
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };


  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          {currentPost.thumbnail && (
            <Image
              src={currentPost.thumbnail}
              alt={currentPost.title}
              fill
              className="object-contain"
              priority={currentSlide === 0}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <Link
            href={`/blog/${currentPost.slug}`}
            className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white"
          >
            {currentPost.tags && currentPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {currentPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-white/20 backdrop-blur-sm px-2 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h2 className="text-2xl md:text-4xl font-bold mb-2 line-clamp-2">
              {currentPost.title}
            </h2>
            {currentPost.description && (
              <p className="text-sm md:text-base text-white/90 line-clamp-2 mb-2">
                {currentPost.description}
              </p>
            )}
            {currentPost.date && (
              <p className="text-sm text-white/70">
                {new Date(currentPost.date).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </Link>
        </motion.div>
      </AnimatePresence>


      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const newDirection = index > currentSlide ? 1 : -1;
              if (externalCurrentSlide === undefined) {
                setInternalDirection(newDirection);
                setInternalCurrentSlide(index);
              }
              onSlideChange?.(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}

