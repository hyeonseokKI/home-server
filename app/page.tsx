import Link from "next/link";

import ImageSlider from "@/components/ImageSlider";


export default function HomePage() {
  return (
    <div className="flex w-full">
      {/* 왼쪽 */}
      <section
        className="
          hidden lg:flex
          flex-[1]
        "
      >
        <ImageSlider />
      </section>

      {/* 오른쪽 */}
      <section
        className="
          flex
          flex-[2]
          w-full
          items-center
          justify-center
          px-8
        "
      >
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4">Welcome</h1>
          <p className="text-gray-500">
            이 영역은 소개, 설명, 버튼, 텍스트 등을 자유롭게 구성할 수 있습니다.
          </p>
        </div>
      </section>
        
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  textDecoration: "none",
};
