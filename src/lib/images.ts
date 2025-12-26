// src/lib/images.ts
import fs from "fs";
import path from "path";

const PUBLIC_IMAGES_PATH = path.join(process.cwd(), "public/projects");

/**
 * public/projects 폴더에서 이미지 파일 목록을 가져옵니다.
 * @returns 이미지 경로 배열 (예: ["/projects/test1.jpg", "/projects/test2.jpg"])
 */
export function getProjectImages(): string[] {
  try {
    if (!fs.existsSync(PUBLIC_IMAGES_PATH)) {
      console.warn(`Projects images directory not found: ${PUBLIC_IMAGES_PATH}`);
      return [];
    }

    const files = fs.readdirSync(PUBLIC_IMAGES_PATH);
    
    return files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext);
      })
      .sort() // 파일명 순서대로 정렬
      .map((file) => `/projects/${file}`);
  } catch (error) {
    console.error("Error reading project images:", error);
    return [];
  }
}

