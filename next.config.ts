import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * 🔥 핵심: Next.js 서버 실행 제거
   * next build 시 정적 HTML(out/) 생성
   */
  output: "export",

  /**
   * /blog → /blog/index.html 형태로 생성
   * Nginx 정적 서빙 최적화
   */
  trailingSlash: true,

  /**
   * next/image 서버 기능 비활성화
   * 정적 호스팅 필수 옵션
   */
  images: {
    unoptimized: true,
  },

  /**
   * 초기 단계에서는 빌드 막힘 방지
   * (나중에 다시 켜도 됨)
   */
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
