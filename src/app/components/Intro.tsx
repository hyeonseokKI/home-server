"use client";

import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const hidden = { opacity: 0, y: -20 };
const visible = { opacity: 1, y: 0 };

export default function Intro() {
  const pathname = usePathname();

  const title = useAnimationControls();
  const line = useAnimationControls();
  const text = useAnimationControls();
  const buttons = useAnimationControls();

  useEffect(() => {
    // if (pathname !== "/") return;

    const run = async () => {
      await title.start({
        ...visible,
        transition: { duration: 0.6 },
      });

      await line.start({
        ...visible,
        transition: { duration: 0.4 },
      });

      await text.start({
        ...visible,
        transition: { duration: 0.5 },
      });

      await buttons.start({
        ...visible,
        transition: { duration: 0.5 },
      });
    };

    run();
  }, [pathname]);

  return (
    <div className="max-w-md text-left px-6 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={hidden}
        animate={title}
      >
        Hi, I'm KIM HYEONSEOK
      </motion.h1>

      <motion.span
        className="block w-20 h-[2px] bg-gray-400 mb-6"
        initial={hidden}
        animate={line}
      />

      <motion.p
        className="text-gray-500 leading-relaxed mb-6"
        initial={hidden}
        animate={text}
      >
        안녕하세요. 방문해주셔서 감사합니다.
      </motion.p>

      <motion.div
        className="flex items-center gap-4"
        initial={hidden}
        animate={buttons}
      >
        <Link
          href="/projects"
          className="px-5 py-2 rounded-md border border-gray-400 text-sm text-gray-300"
        >
          Project
        </Link>

        <Link
          href="/bio"
          className="px-5 py-2 rounded-md border border-gray-400 text-sm text-gray-300"
        >
          Bio.
        </Link>
      </motion.div>
    </div>
  );
}
