import { getPostSlugs } from "@/lib/posts";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * 🔥 SSG 필수
 */
export function generateStaticParams() {
  return getPostSlugs();
}

export default async function BlogPostPage({ params }: PageProps) {
  // ✅ 반드시 await
  const { slug } = await params;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{slug}</h1>
      <p>이 글은 Markdown에서 불러올 예정입니다.</p>
    </main>
  );
}
