import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";

export default function BlogCard({
  slug,
  title,
  description,
  date,
  thumbnail,
  tags,
}: PostMeta) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group rounded-xl border bg-card p-4 transition hover:shadow-lg flex flex-col md:flex-row lg:flex-col gap-4"
    >
      {/* 큰 화면(lg): 이미지 위, 중간 화면(md): 좌측, 작은 화면(sm 이하): 숨김 */}
      {thumbnail && (
        <div className="relative w-full md:w-32 lg:w-full aspect-video md:aspect-square lg:aspect-video overflow-hidden rounded-lg flex-shrink-0 hidden md:block">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition group-hover:scale-105"
          />
        </div>
      )}

      {/* 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        {tags && tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded bg-muted px-2 py-0.5 text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
        
        {formattedDate && (
          <p className="mt-1 text-sm text-muted-foreground">
            {formattedDate}
          </p>
        )}

        {description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 hidden lg:block">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

