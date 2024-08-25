// eslint-disable-next-line @typescript-eslint/no-explicit-any

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Project } from '../types';

interface ProjectSelectorProps {
  projects: Project[];
  currentProject: Project;
  onProjectSelect: (projectId: string) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projects, currentProject, onProjectSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-[#FF00FF] rounded-lg px-3 py-2 text-white"
      >
        {currentProject.name}
        <ChevronDown className="ml-2" size={16} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          {projects.map(project => (
            <button
              key={project.id}
              onClick={() => {
                onProjectSelect(project.id);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-[#FF00FF] hover:bg-gray-100"
            >
              {project.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;