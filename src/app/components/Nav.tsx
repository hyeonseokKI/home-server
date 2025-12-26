// app\components\Nav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { siteConfig } from "@/config/site";

import ScrollProgressBar from "@/components/common/ScrollProgressBar";


export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="h-14 relative z-50 w-full">
        <div className="h-full mx-4 md:mx-8 lg:mx-16 px-4 md:px-6 flex items-center justify-between">
          
          {/* Left */}
          <Link href="/" className="font-bold text-lg">
            {siteConfig.name}
          </Link>

          {/* Right Area */}
          <div className="flex items-center gap-3">
            
            {/* Theme toggle - ALWAYS visible */}
            <ThemeToggle />

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6 ml-4">
              <NavLinks />
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <ScrollProgressBar />
      </header>

      {/* ===== Mobile Fullscreen Overlay ===== */}
      {open && (
        <div className="fixed inset-0 bg-black/80 z-[999] flex flex-col">
          
          {/* Close */}
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Menu (ThemeToggle ❌) */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-6 text-white text-lg font-medium">
            <NavLinks onClick={() => setOpen(false)} />
          </nav>
        </div>
      )}
    </>
  );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <Link href="/" onClick={onClick}>Home</Link>
      <Link href="/projects" onClick={onClick}>Project</Link>
      <Link href="/portfolio" onClick={onClick}>Portfolio</Link>
      <span className="hidden md:inline text-gray-400">|</span>
      <Link href="/blog" onClick={onClick}>Blog</Link>
    </>
  );
}
