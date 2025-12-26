import { getAllProjects, getAllTechs } from "@/lib/projects";
import ProjectFilter from "@/components/project/ProjectFilter";

export default function ProjectsPage() {
  const projects = getAllProjects();
  const allTechs = getAllTechs();

  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16 max-w-6xl">
      <h1 className="mb-8 text-3xl font-bold text-center">Projects</h1>
      <ProjectFilter projects={projects} allTechs={allTechs} />
    </section>
  );
}
