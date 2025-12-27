"use client";

import SlideShow, { Slide } from "@/components/portfolio/SlideShow";

export default function PortfolioPage() {
  // 포트폴리오 슬라이드 데이터
  const slides: Slide[] = [
    {
      id: "intro",
      title: "안녕하세요",
      content: (
        <div className="text-center space-y-6">
          <p className="text-2xl md:text-4xl font-light">
            포트폴리오에 오신 것을 환영합니다
          </p>
          <p className="text-lg md:text-xl text-white/80">
            저의 경력과 프로젝트를 소개합니다
          </p>
        </div>
      ),
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "about",
      title: "About Me",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">기본 정보</h3>
              <ul className="space-y-2 text-lg">
                <li>• 이름: [이름을 입력하세요]</li>
                <li>• 직업: [직업을 입력하세요]</li>
                <li>• 위치: [위치를 입력하세요]</li>
                <li>• 이메일: [이메일을 입력하세요]</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">소개</h3>
              <p className="text-lg leading-relaxed">
                [자신에 대한 소개를 작성하세요. 경력, 관심사, 목표 등을
                포함할 수 있습니다.]
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "skills",
      title: "Skills & Technologies",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-xl font-semibold mb-3">Frontend</h3>
              <ul className="space-y-2">
                <li>• React / Next.js</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Framer Motion</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-xl font-semibold mb-3">Backend</h3>
              <ul className="space-y-2">
                <li>• Node.js</li>
                <li>• [기술 스택 추가]</li>
                <li>• [기술 스택 추가]</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-xl font-semibold mb-3">Tools</h3>
              <ul className="space-y-2">
                <li>• Git / GitHub</li>
                <li>• VS Code</li>
                <li>• [도구 추가]</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "experience",
      title: "Experience",
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-6 space-y-4">
            <div>
              <h3 className="text-2xl font-semibold">[회사명 또는 직책]</h3>
              <p className="text-muted-foreground">[기간]</p>
              <ul className="mt-3 space-y-2 text-lg">
                <li>• [주요 업무 또는 성과 1]</li>
                <li>• [주요 업무 또는 성과 2]</li>
                <li>• [주요 업무 또는 성과 3]</li>
              </ul>
            </div>
          </div>
          <div className="border-l-4 border-primary pl-6 space-y-4">
            <div>
              <h3 className="text-2xl font-semibold">[회사명 또는 직책]</h3>
              <p className="text-muted-foreground">[기간]</p>
              <ul className="mt-3 space-y-2 text-lg">
                <li>• [주요 업무 또는 성과 1]</li>
                <li>• [주요 업무 또는 성과 2]</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "projects",
      title: "Projects",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-xl font-semibold mb-2">[프로젝트 이름]</h3>
              <p className="text-muted-foreground mb-3">[기술 스택]</p>
              <p className="text-lg mb-3">
                [프로젝트 설명을 작성하세요. 주요 기능과 특징을 포함할 수
                있습니다.]
              </p>
              <a
                href="#"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                자세히 보기 →
              </a>
            </div>
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-xl font-semibold mb-2">[프로젝트 이름]</h3>
              <p className="text-muted-foreground mb-3">[기술 스택]</p>
              <p className="text-lg mb-3">
                [프로젝트 설명을 작성하세요. 주요 기능과 특징을 포함할 수
                있습니다.]
              </p>
              <a
                href="#"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                자세히 보기 →
              </a>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      content: (
        <div className="text-center space-y-8">
          <p className="text-2xl md:text-3xl font-light">
            함께 일하고 싶으신가요?
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:your.email@example.com"
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-lg font-medium"
            >
              이메일 보내기
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg border hover:bg-accent transition-colors text-lg font-medium"
            >
              GitHub 방문
            </a>
          </div>
              <p className="text-white/80">
            언제든지 연락주시면 빠르게 답변드리겠습니다.
          </p>
        </div>
      ),
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
  ];

  return (
    <div className="absolute inset-0 top-14 bottom-0 w-full h-[calc(100vh-3.5rem-6rem)] p-4 md:p-8 pb-28 portfolio-slideshow-container">
      <SlideShow slides={slides} />
    </div>
  );
}
