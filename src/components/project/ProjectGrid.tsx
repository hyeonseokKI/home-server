import { ProjectMeta } from "@/lib/projects";

import ProjectCard from "@/components/project/ProjectCard";

export default function ProjectGrid({
  projects,
}: {
  projects: ProjectMeta[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}
    </div>
  );
}
