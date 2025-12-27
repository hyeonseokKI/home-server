import HomeContent from "@/app/components/HomeContent";
import { getProjectImages } from "@/lib/images";

export default function HomePage() {
  const images = getProjectImages();

  return <HomeContent images={images} />;
}

const buttonStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  textDecoration: "none",
};
