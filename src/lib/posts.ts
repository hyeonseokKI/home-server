// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_PATH = path.join(
  process.cwd(),
  "src/content/posts"
);

export type PostMeta = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  thumbnail?: string;
  tags?: string[];
};

/** ✅ Posts 목록용 */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_PATH)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_PATH);

  const posts = files
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "").trim();
      const filePath = path.join(POSTS_PATH, filename);
      const file = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(file);

      return {
        slug,
        ...(data as Omit<PostMeta, "slug">),
      };
    });

  // date 기준 최신순 정렬
  return posts.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/** ✅ 상세 페이지용 */
export function getPostBySlug(slug: string) {
  // slug에서 공백 제거
  const trimmedSlug = slug.trim();
  const filePath = path.join(POSTS_PATH, `${trimmedSlug}.mdx`);

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
export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(POSTS_PATH)) {
      console.warn(`Posts directory not found: ${POSTS_PATH}`);
      return [];
    }

    const files = fs.readdirSync(POSTS_PATH);
    
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, "").trim())
      .filter((slug) => slug.length > 0); // 빈 slug 제거
  } catch (error) {
    console.error("Error reading post slugs:", error);
    return [];
  }
}

/** ✅ 모든 포스트에서 사용된 tags 목록 추출 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((t) => tagSet.add(t));
    }
  });
  
  return Array.from(tagSet).sort();
}
