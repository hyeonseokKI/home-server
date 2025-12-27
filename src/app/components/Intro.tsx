"use client";

import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const hidden = { opacity: 0, y: -20 };
const visible = { opacity: 1, y: 0 };

export default function Intro() {
  const pathname = usePathname();
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const projectRef = useRef<HTMLAnchorElement>(null);
  const portfolioRef = useRef<HTMLAnchorElement>(null);
  const blogRef = useRef<HTMLAnchorElement>(null);

  const projectButton = useAnimationControls();
  const portfolioButton = useAnimationControls();
  const blogButton = useAnimationControls();

  useEffect(() => {
    // 가장 긴 텍스트의 너비 측정
    const measureWidths = () => {
      if (projectRef.current && portfolioRef.current && blogRef.current) {
        const projectWidth = projectRef.current.scrollWidth;
        const portfolioWidth = portfolioRef.current.scrollWidth;
        const blogWidth = blogRef.current.scrollWidth;
        const max = Math.max(projectWidth, portfolioWidth, blogWidth);
        setMaxWidth(max);
      }
    };

    // DOM이 렌더링된 후 측정
    const timeoutId = setTimeout(measureWidths, 0);

    // 리사이즈 시 재측정
    window.addEventListener("resize", measureWidths);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", measureWidths);
    };
  }, []);

  useEffect(() => {
    // if (pathname !== "/") return;

    const run = async () => {
      await projectButton.start({
        ...visible,
        transition: { duration: 0.5 },
      });

      await portfolioButton.start({
        ...visible,
        transition: { duration: 0.5 },
      });

      await blogButton.start({
        ...visible,
        transition: { duration: 0.5 },
      });
    };

    run();
  }, [pathname, projectButton, portfolioButton, blogButton]);

  return (
    <div className="w-full max-w-md text-left px-4 md:px-6 py-8">
      <div className="flex flex-col gap-4 items-center">
        <motion.div
          initial={hidden}
          animate={projectButton}
          className="relative overflow-hidden"
          style={{ width: maxWidth > 0 ? `${maxWidth}px` : "auto" }}
          whileHover="hover"
          whileTap="hover"
        >
          <motion.div
            className="absolute inset-0 bg-[#388d95]"
            initial={{ scaleX: 0 }}
            variants={{
              hover: { scaleX: 1 },
            }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <Link
            ref={projectRef}
            href="/projects"
            className="relative px-8 py-4 text-xl font-bold text-gray-300 block z-10 text-center whitespace-nowrap"
          >
            Project
          </Link>
        </motion.div>

        <motion.div
          initial={hidden}
          animate={portfolioButton}
          className="relative overflow-hidden"
          style={{ width: maxWidth > 0 ? `${maxWidth}px` : "auto" }}
          whileHover="hover"
          whileTap="hover"
        >
          <motion.div
            // className="absolute inset-0 bg-[#313741]"
            className="absolute inset-0 bg-[#388d95]"

            initial={{ scaleX: 0 }}
            variants={{
              hover: { scaleX: 1 },
            }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <Link
            ref={portfolioRef}
            href="/portfolio"
            className="relative px-8 py-4 text-xl font-bold text-gray-300 block z-10 text-center whitespace-nowrap"
          >
            Portfolio
          </Link>
        </motion.div>

        <motion.span
          className="block w-20 h-[2px] bg-gray-400"
          initial={hidden}
          animate={blogButton}
        />

        <motion.div
          initial={hidden}
          animate={blogButton}
          className="relative overflow-hidden"
          style={{ width: maxWidth > 0 ? `${maxWidth}px` : "auto" }}
          whileHover="hover"
          whileTap="hover"
        >
          <motion.div
            // className="absolute inset-0 bg-[#2a3a4a]"
            className="absolute inset-0 bg-[#388d95]"

            initial={{ scaleX: 0 }}
            variants={{
              hover: { scaleX: 1 },
            }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <Link
            ref={blogRef}
            href="/blog"
            className="relative px-8 py-4 text-xl font-bold text-gray-300 block z-10 text-center whitespace-nowrap"
          >
            Blog
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
