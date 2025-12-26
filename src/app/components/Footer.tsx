import Link from "next/link";
import { siteConfig } from "@/config/site";

import GithubIcon from '@/components/icons/GithubIcon';
import LinkedInIcon from "@/components/icons/LinkedInIcon";


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

            {/* <a
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
            </a> */}
              <Link href='https://www.linkedin.com/' target='_blank'>
            <GithubIcon
              className='fill-foreground transition hover:fill-pink-600'
              height={30}
              width={30}
            />
            </Link>

          <Link href='https://www.linkedin.com/' target='_blank'>
            <LinkedInIcon
              className='fill-foreground transition hover:fill-pink-600'
              height={30}
              width={30}
            />
        </Link>

          </div>

        </div>
      </div>
    </footer>
  );
}
