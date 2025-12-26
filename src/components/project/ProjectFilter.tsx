"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ProjectMeta } from "@/lib/projects";
import ProjectGrid from "@/components/project/ProjectGrid";

interface ProjectFilterProps {
  projects: ProjectMeta[];
  allTechs: string[];
}

export default function ProjectFilter({
  projects,
  allTechs,
}: ProjectFilterProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (!selectedTech) {
      return projects;
    }
    return projects.filter(
      (project) => project.tech && project.tech.includes(selectedTech)
    );
  }, [projects, selectedTech]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={selectedTech === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTech(null)}
        >
          전체
        </Button>
        {allTechs.map((tech) => (
          <Button
            key={tech}
            variant={selectedTech === tech ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTech(tech)}
          >
            {tech}
          </Button>
        ))}
      </div>
      <ProjectGrid projects={filteredProjects} />
    </div>
  );
}

