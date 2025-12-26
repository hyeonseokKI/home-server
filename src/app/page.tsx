import Link from "next/link";

import ImageSlider from "@/app/components/ImageSlider";
import Intro from "@/app/components/Intro";
import { getProjectImages } from "@/lib/images";


export default function HomePage() {
  const images = getProjectImages();

  return (
    <div className="flex w-full min-h-full mx-4 md:mx-8 lg:mx-16">

      {/* 왼쪽 */}
      <section
        className="
          hidden lg:flex
          flex-1
          min-w-0
        "
      >
        <ImageSlider images={images} />
      </section>

      {/* 오른쪽 */}
      <section
        className="
          flex
          flex-1
          w-full
          min-w-0
          items-center
          justify-center
          px-4 md:px-8
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
