import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import {
  getPostBySlug,
  getAllPostSlugs,
} from "@/lib/posts";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import TableOfContentSidebar from "@/components/blog/TableOfContentSidebar";

type PageProps = {
  params: Promise<{
    slug: string;
  }> | {
    slug: string;
  };
};

/** ✅ 필수 (output: export 대응) */
export async function generateStaticParams() {
  try {
    const slugs = getAllPostSlugs();

    // 빈 배열이면 빌드 오류 방지를 위해 빈 객체 반환
    if (slugs.length === 0) {
      return [];
    }

    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

/** ✅ 페이지 메타데이터 생성 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: siteConfig.name,
    };
  }

  return {
    title: `${siteConfig.name} | ${post.meta.title}`,
    description: post.meta.description || siteConfig.description,
  };
}

export default async function BlogDetailPage({
  params,
}: PageProps) {
  // Next.js 15+ 에서 params가 Promise일 수 있음
  const resolvedParams = await Promise.resolve(params);
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const { content, meta } = post;

  const { content: mdxContent } = await compileMDX({
    source: content,
  });

  const formattedDate = meta.date
    ? new Date(meta.date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="prose mx-auto w-full max-w-[750px] px-6 dark:prose-invert py-16">
      <header className="mb-10 not-prose">
        <h1 className="text-3xl font-bold">{meta.title}</h1>
        {meta.description && (
          <p className="mt-2 text-muted-foreground">
            {meta.description}
          </p>
        )}
        
        <div className="mt-4 text-sm text-muted-foreground flex flex-wrap items-center gap-2">
          {formattedDate && <span>{formattedDate}</span>}
          {meta.tags && meta.tags.length > 0 && (
            <>
              {formattedDate && <span>|</span>}
              <div className="flex flex-wrap gap-2">
                {meta.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded bg-muted px-2 py-0.5 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {meta.thumbnail && (
        <div className="relative mb-10 aspect-video overflow-hidden rounded-lg not-prose">
          <Image
            src={meta.thumbnail}
            alt={meta.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <article className="relative prose dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2 pb-[500px]">
        {mdxContent}
        
        {/* TableOfContentSidebar */}
        <TableOfContentSidebar content={content} />
      </article>
    </div>
  );
}

