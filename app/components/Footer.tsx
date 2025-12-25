import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className=" text-gray-400">
      {/* 상단 정보 영역 */}
      <div className="w-full px-8 py-3">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">

          
          {/* 1열: 텍스트 정보 */}
          <div className="text-sm">
            {/* 1행: 서비스명 */}
            <p className="font-semibold text-gray-200">
              {siteConfig.name}
            </p>

            {/* 2행: Writer | Email */}
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Writer :  {siteConfig.author} </span>
              <span className="text-gray-600">|</span>
              <span>Email : {siteConfig.email}</span>
            </div>

            {/* 3행: Copyright */}
            <p className="mt-2 text-gray-500">
              © {new Date().getFullYear()} KHS. All rights reserved.
            </p>
          </div>

          {/* 2열: GitHub 아이콘 (가운데 정렬) */}
          <div className="flex items-center justify-start  p-2">

            <a
              href="https://github.com/hyeonseokKI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
                  className="flex h-8 w-8 items-center justify-center rounded-full 
                        bg-gray-300 text-gray-300 
                        hover:bg-gray-600 hover:text-white 
                        transition"
                >
              <img
                src="/icon/github.svg"
                alt="GitHub"
                className="h-5 w-5"
              />
            </a>
          </div>

        </div>
      </div>

      {/* (선택) 하단 링크 영역 — 필요 시 추가 */}
      {/* 
      <div className="border-t border-gray-700">
        <div className="mx-auto max-w-6xl px-8 py-6">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/terms">이용약관</Link>
            <Link href="/privacy" className="font-semibold text-gray-200">
              개인정보 처리 방침
            </Link>
          </nav>
        </div>
      </div>
      */}
    </footer>
  );
}
