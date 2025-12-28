"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useHeadingsObserver } from "@/hooks/useHeadingsObserver";

interface Heading {
  id: string;
  text: string;
  level: number;
  indent: number; // h2는 0, h3는 1
}

interface TableOfContentSidebarProps {
  content: string;
}

export default function TableOfContentSidebar({
  content,
}: TableOfContentSidebarProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const activeIdList = useHeadingsObserver("h2, h3");

  // DOM에서 헤딩 추출
  useEffect(() => {
    // DOM이 준비될 때까지 대기
    const extractHeadings = () => {
      const proseElement = document.querySelector(".prose");
      if (!proseElement) {
        // DOM이 아직 준비되지 않았으면 재시도
        setTimeout(extractHeadings, 100);
        return;
      }

      const headingElements = proseElement.querySelectorAll("h2, h3");
      const matches: Heading[] = [];
      const idCounts: Record<string, number> = {};

      headingElements.forEach((element, index) => {
        const level = parseInt(element.tagName.charAt(1));
        const text = element.textContent?.trim() || "";
        if (!text) return; // 빈 텍스트는 건너뛰기
        
        let id = element.id;

        // id가 없으면 생성
        if (!id) {
          const baseId = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
          
          if (!baseId) {
            // id를 생성할 수 없으면 인덱스 사용
            id = `heading-${index}`;
          } else {
            // 중복 방지를 위해 카운터 추가
            if (idCounts[baseId] !== undefined) {
              idCounts[baseId]++;
              id = `${baseId}-${idCounts[baseId]}`;
            } else {
              idCounts[baseId] = 0;
              id = baseId;
            }
          }
          
          element.id = id;
        } else {
          // 기존 id도 카운팅
          if (idCounts[id] !== undefined) {
            idCounts[id]++;
            const newId = `${id}-${idCounts[id]}`;
            element.id = newId;
            id = newId;
          } else {
            idCounts[id] = 0;
          }
        }

        // indent 계산: h2는 0, h3는 1
        const indent = level - 2;

        matches.push({ id, text, level, indent });
      });

      setHeadings(matches);
    };

    // 초기 실행
    extractHeadings();
  }, [content]);

  const scrollToHeading = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // 조금 아래로 이동하기 위한 오프셋 (px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className="not-prose absolute -top-[500px] left-full -mb-[100px] hidden h-[calc(100%+150px)] xl:block">
      <div className="sticky bottom-0 top-[200px] z-10 ml-[5rem] w-[200px]">
        <div className="mb-4 border-l px-4 py-2">
          <div className="mb-1 font-bold">목차</div>
          <ul className="text-xs">
            {headings.map((item) => {
              const isH3 = item.indent === 1;
              const isIntersecting = activeIdList.includes(item.id);
              return (
                <li
                  key={item.id}
                  className={`py-1 transition ${
                    isH3 ? "ml-4" : ""
                  } ${
                    isIntersecting ? "font-medium" : ""
                  }`}
                >
                  <Link
                    href={`#${item.id}`}
                    onClick={(e) => scrollToHeading(item.id, e)}
                    style={{
                      color: isIntersecting ? "#388d95" : undefined,
                    }}
                    className="hover:opacity-70"
                  >
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

