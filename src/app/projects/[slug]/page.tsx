import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import {
  getProjectBySlug,
  getAllProjectSlugs,
} from "@/lib/projects";
import { ServiceLink } from "@/components/project/ServiceLink";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

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
    const slugs = getAllProjectSlugs();

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
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: siteConfig.name,
    };
  }

  return {
    title: `${siteConfig.name} | ${project.meta.title}`,
    description: project.meta.description || siteConfig.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps) {
  // Next.js 15+ 에서 params가 Promise일 수 있음
  const resolvedParams = await Promise.resolve(params);
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const { content, meta } = project;

  const { content: mdxContent } = await compileMDX({
    source: content,
  });

  return (
    <article className="flex flex-col relative w-full max-w-[1060px] mx-auto my-[50px] px-5">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">{meta.title}</h1>
        {meta.description && (
          <p className="mt-2 text-muted-foreground">
            {meta.description}
          </p>
        )}
        
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {meta.date && (
            <time dateTime={meta.date}>
              {new Date(meta.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {meta.tech && meta.tech.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {meta.tech.map((t: string) => (
                <span
                  key={t}
                  className="rounded bg-muted px-2 py-0.5 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {meta.thumbnail && (
        <div className="relative mb-10 aspect-video overflow-hidden rounded-lg">
          <Image
            src={meta.thumbnail}
            alt={meta.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
        {meta.url && (
          <div className="mb-6">
            <ServiceLink url={meta.url} />
          </div>
        )}
        {mdxContent}
      </div>
    </article>
  );
}
