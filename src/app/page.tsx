import Link from "next/link";

import ImageSlider from "@/app/components/ImageSlider";
import Intro from "@/app/components/Intro";


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
          px-8
        "
      >
      <Intro />
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
