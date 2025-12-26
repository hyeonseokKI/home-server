import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export function getPostSlugs() {
  return fs.readdirSync(POSTS_DIR).map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}
