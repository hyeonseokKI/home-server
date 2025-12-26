import { getAllProjects } from "@/lib/projects";
import ProjectGrid from "@/components/project/ProjectGrid";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <section className="container py-16">
      <h1 className="mb-8 text-3xl font-bold">Projects</h1>
      <ProjectGrid projects={projects} />
    </section>
  );
}
