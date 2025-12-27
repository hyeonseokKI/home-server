import Link from "next/link";
import Image from "next/image";
import { ProjectMeta } from "@/lib/projects";

function formatMonthRange(startMonth?: string, endMonth?: string): string | null {
  if (!startMonth && !endMonth) return null;
  
  const formatMonth = (monthStr: string): string => {
    const [year, month] = monthStr.split("-");
    if (!year || !month) return monthStr;
    return `${year}년 ${parseInt(month).toString().padStart(2, "0")}월`;
  };

  if (startMonth && endMonth) {
    return `${formatMonth(startMonth)} - ${formatMonth(endMonth)}`;
  }
  if (startMonth) {
    return `${formatMonth(startMonth)} - 진행중`;
  }
  if (endMonth) {
    return `${formatMonth(endMonth)}`;
  }
  return null;
}

export default function ProjectCard({
  slug,
  title,
  description,
  thumbnail,
  tech,
  startMonth,
  endMonth,
}: ProjectMeta) {
  const monthRange = formatMonthRange(startMonth, endMonth);

  return (
    <Link
      href={`/projects/${slug}`}
      className="group rounded-xl border bg-card p-4 transition hover:shadow-lg"
    >
      {thumbnail && (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition group-hover:scale-105"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold">{title}</h3>
      {monthRange && (
        <p className="mt-1 text-sm text-muted-foreground">
          {monthRange}
        </p>
      )}
      <p className="mt-1 text-sm text-muted-foreground">
        {description}
      </p>

      {tech && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {tech.map((t) => (
            <li
              key={t}
              className="rounded bg-muted px-2 py-0.5 text-xs"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
