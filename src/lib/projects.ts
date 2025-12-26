// src/lib/projects.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_PATH = path.join(
  process.cwd(),
  "src/content/projects"
);

export type ProjectMeta = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  thumbnail?: string;
  tech?: string[];
  url?: string;
};

/** ✅ Projects 목록용 */
export function getAllProjects(): ProjectMeta[] {
  const files = fs.readdirSync(PROJECTS_PATH);

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "").trim();
    const filePath = path.join(PROJECTS_PATH, filename);
    const file = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(file);

    return {
      slug,
      ...(data as Omit<ProjectMeta, "slug">),
    };
  });
}

/** ✅ 상세 페이지용 */
export function getProjectBySlug(slug: string) {
  // slug에서 공백 제거
  const trimmedSlug = slug.trim();
  const filePath = path.join(PROJECTS_PATH, `${trimmedSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const file = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(file);

  return {
    meta: data,
    content,
  };
}

/** ✅ SSG (output: export)용 */
export function getAllProjectSlugs(): string[] {
  try {
    if (!fs.existsSync(PROJECTS_PATH)) {
      console.warn(`Projects directory not found: ${PROJECTS_PATH}`);
      return [];
    }

    const files = fs.readdirSync(PROJECTS_PATH);
    
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, "").trim())
      .filter((slug) => slug.length > 0); // 빈 slug 제거
  } catch (error) {
    console.error("Error reading project slugs:", error);
    return [];
  }
}

/** ✅ 모든 프로젝트에서 사용된 tech 목록 추출 */
export function getAllTechs(): string[] {
  const projects = getAllProjects();
  const techSet = new Set<string>();
  
  projects.forEach((project) => {
    if (project.tech) {
      project.tech.forEach((t) => techSet.add(t));
    }
  });
  
  return Array.from(techSet).sort();
}