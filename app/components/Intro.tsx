"use client";

import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Intro() {
  const pathname = usePathname();

  const title = useAnimationControls();
  const line = useAnimationControls();
  const text = useAnimationControls();
  const buttons = useAnimationControls();

  useEffect(() => {
    // 홈으로 들어왔을 때만 동작
    if (pathname !== "/") return;

    const run = async () => {
      // 🔥 1. 무조건 초기화
      title.set({ opacity: 0, y: -20 });
      line.set({ opacity: 0, y: -20 });
      text.set({ opacity: 0, y: -20 });
      buttons.set({ opacity: 0, y: -20 });

      // 🔥 2. 순차 애니메이션
      await title.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      });

      await line.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
      });

      await text.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });

      await buttons.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });
    };

    run();
  }, [pathname]); // 🔑 핵심

  return (
    <div className="max-w-md text-left px-6 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={false}   // ❗ initial 사용 안 함
        animate={title}
      >
        Hi, I'm KIM HYEONSEOK
      </motion.h1>

      <motion.span
        className="block w-20 h-[2px] bg-gray-400 mb-6"
        initial={false}
        animate={line}
      />

      <motion.p
        className="text-gray-500 leading-relaxed mb-6"
        initial={false}
        animate={text}
      >
        안녕하세요. 방문해주셔서 감사합니다.
      </motion.p>

      <motion.div
        className="flex items-center gap-4"
        initial={false}
        animate={buttons}
      >
        <Link href="/projects" className="px-5 py-2 rounded-md border border-gray-400 text-sm text-gray-300">
          Project
        </Link>

        <Link href="/bio" className="px-5 py-2 rounded-md border border-gray-400 text-sm text-gray-300">
          Bio.
        </Link>
      </motion.div>
    </div>
  );
}
