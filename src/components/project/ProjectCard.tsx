import Link from "next/link";
import Image from "next/image";
import { ProjectMeta } from "@/lib/projects";

export default function ProjectCard({
  slug,
  title,
  description,
  thumbnail,
  tech,
}: ProjectMeta) {
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
