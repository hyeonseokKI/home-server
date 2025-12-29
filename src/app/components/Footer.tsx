import Link from "next/link";
import { siteConfig } from "@/config/site";

import GithubIcon from '@/components/icons/GithubIcon';
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import MailIcon from "@/components/icons/MailIcon";


export default function Footer() {
  return (
    <footer className="w-full text-muted-foreground">
      {/* 상단 정보 영역 */}
      <div className="w-full px-4 md:px-8 py-3">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">

          
          {/* 1열: 텍스트 정보 */}
          <div className="text-sm">
            {/* 1행: 서비스명 */}
            <p className="font-semibold text-foreground">
              {siteConfig.name}
            </p>

            {/* 2행: Writer | Email */}
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Writer :  {siteConfig.author} </span>
              <span className="text-muted-foreground">|</span>
              <a 
                href={`mailto:${siteConfig.email}`}
                className="hover:text-pink-600 transition-colors"
              >
                Email : {siteConfig.email}
              </a>

            </div>

            {/* 3행: Copyright */}
            <p className="mt-2 text-muted-foreground">
              © {new Date().getFullYear()} KHS. All rights reserved.
            </p>
          </div>

          {/* 2열: GitHub 아이콘 (가운데 정렬) */}
          <div className="flex items-center justify-start gap-x-4 p-2">

              <Link href='https://github.com/hyeonseokKI' target='_blank'>
            <GithubIcon
              className='fill-foreground transition hover:fill-pink-600'
              height={30}
              width={30}
            />
            </Link>

          <Link href='https://www.linkedin.com/in/%ED%98%84%EC%84%9D-%EA%B9%80-632414377/' target='_blank'>
            <LinkedInIcon
              className='fill-foreground transition hover:fill-pink-600'
              height={30}
              width={30}
            />
        </Link>

          <Link href={`mailto:${siteConfig.email}`}>
            <MailIcon
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
