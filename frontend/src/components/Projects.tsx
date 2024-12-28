import { useState } from "react";

const Projects = ({ config }: any) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  if (!config?.projects) return <p>No projects found in config</p>;

  const handleSelectProject = (project: string) => {
    setSelectedProject(project);
  };

  return (
    <section>
      <h2>Projects</h2>
      <ul>
        {Object.keys(config.projects).map((project) => (
          <li key={project}>
            <button onClick={() => handleSelectProject(project)}>
              {config.projects[project].name}
            </button>
          </li>
        ))}
      </ul>
      {selectedProject && (
        <p>Selected project: {config.projects[selectedProject]?.name}</p>
      )}
    </section>
  );
};

export default Projects;
