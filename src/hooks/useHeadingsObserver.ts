"use client";

import { useEffect, useState } from "react";

export function useHeadingsObserver(selectors: string) {
  const [activeIdList, setActiveIdList] = useState<string[]>([]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let rafId: number | null = null;
    let elements: NodeListOf<Element> | null = null;

    // DOM이 준비될 때까지 대기
    const setupObserver = () => {
      const proseElement = document.querySelector(".prose");
      if (!proseElement) {
        timeoutId = setTimeout(setupObserver, 100);
        return;
      }

      const foundElements = proseElement.querySelectorAll(selectors);
      if (foundElements.length === 0) {
        // DOM이 아직 준비되지 않았으면 재시도
        timeoutId = setTimeout(setupObserver, 100);
        return;
      }

      elements = foundElements;

      // id가 없는 요소에 id 생성
      elements.forEach((element) => {
        if (!element.id) {
          const text = element.textContent?.trim() || "";
          if (text) {
            const baseId = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
              .replace(/^-|-$/g, "");
            if (baseId) {
              element.id = baseId;
            }
          }
        }
      });

      const checkHeadingsInRange = () => {
        if (!elements) return;

        // y축 범위 정의: rootMargin '-32px 0px -80px 0px' 참고
        // 상단에서 32px 아래부터, 하단에서 80px 위까지
        const rangeTop = 32; // 상단 32px
        const rangeBottom = window.innerHeight - 80; // 하단 80px 위

        const activeIds: string[] = [];

        elements.forEach((element) => {
          if (!element.id) return;

          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          const elementBottom = rect.bottom;
          const elementCenter = (elementTop + elementBottom) / 2;

          // 요소의 중심점이 정의된 y축 범위 안에 있는지 확인
          if (elementCenter >= rangeTop && elementCenter <= rangeBottom) {
            activeIds.push(element.id);
          }
        });

        setActiveIdList(activeIds);
      };

      // 스크롤 및 리사이즈 이벤트 핸들러
      const handleUpdate = () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        rafId = requestAnimationFrame(checkHeadingsInRange);
      };

      // 초기 실행
      checkHeadingsInRange();

      // 이벤트 리스너 등록
      window.addEventListener("scroll", handleUpdate, { passive: true });
      window.addEventListener("resize", handleUpdate, { passive: true });

      // cleanup 함수 반환
      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        window.removeEventListener("scroll", handleUpdate);
        window.removeEventListener("resize", handleUpdate);
      };
    };

    const cleanup = setupObserver();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (cleanup) {
        cleanup();
      }
    };
  }, [selectors]);

  return activeIdList;
}

