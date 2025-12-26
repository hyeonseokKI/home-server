import { getAllProjects, getAllTechs } from "@/lib/projects";
import ProjectFilter from "@/components/project/ProjectFilter";

export default function ProjectsPage() {
  const projects = getAllProjects();
  const allTechs = getAllTechs();

  return (
    <section className="container py-16">
      <h1 className="mb-8 text-3xl font-bold">Projects</h1>
      <ProjectFilter projects={projects} allTechs={allTechs} />
    </section>
  );
}
