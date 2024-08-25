import React, { useState } from 'react';
import Modal from './Modal';
import { Project } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  currentProject: Project;
  onAddProject: (name: string) => void;
  onDeleteProject: (id: string) => void;
  onAddColumn: (column: string) => void;
  onRemoveColumn: (column: string) => void;
  onResetColumns: () => void;
}

type TabType = 'projects' | 'columns' | 'help';

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  projects,
  currentProject,
  onAddProject,
  onDeleteProject,
  onAddColumn,
  onRemoveColumn,
  onResetColumns,
}) => {
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [newColumnName, setNewColumnName] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('projects');

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      onAddProject(newProjectName.trim());
      setNewProjectName('');
    }
  };

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      onAddColumn(newColumnName.trim());
      setNewColumnName('');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Projects</h3>
            <ul>
              {projects.map(project => (
                <li key={project.id} className="flex justify-between items-center mb-2">
                  <span>{project.name}</span>
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    className="bg-[#FF00FF] text-white px-2 py-1 rounded hover:bg-[#FF00FF] transition duration-200"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex mt-2">
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="New project name"
                className="flex-grow px-2 py-1 rounded-l-lg focus:outline-none border border-[#FF00FF]"
              />
              <button
                onClick={handleAddProject}
                className="bg-[#FF00FF] text-white px-3 py-1 rounded-r-lg hover:bg-[#FF00FF] transition duration-200"
              >
                Add Project
              </button>
            </div>
          </div>
        );
      case 'columns':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Columns</h3>
            <ul>
              {currentProject.columns.map(column => (
                <li key={column} className="flex justify-between items-center mb-2">
                  <span>{column}</span>
                  <button
                    onClick={() => onRemoveColumn(column)}
                    className="bg-[#FF00FF] text-white px-2 py-1 rounded hover:bg-[#FF00FF] transition duration-200"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex mt-2">
              <input
                type="text"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                placeholder="New column name"
                className="flex-grow px-2 py-1 rounded-l-lg focus:outline-none border border-[#FF00FF]"
              />
              <button
                onClick={handleAddColumn}
                className="bg-[#FF00FF] text-white px-3 py-1 rounded-r-lg hover:bg-[#FF00FF] transition duration-200"
              >
                Add Column
              </button>
            </div>
            <button
              onClick={onResetColumns}
              className="mt-2 bg-[#FF00FF] text-white px-3 py-1 rounded-lg hover:bg-[#FF00FF] transition duration-200 w-full"
            >
              Reset to Default Columns
            </button>
          </div>
        );
      case 'help':
        return (
          <div className="">
            <h3 className="text-xl font-semibold mb-2">Help</h3>
            <h4 className="text-lg font-semibold mt-4 mb-2">Technology Stack</h4>
            <ul className="list-disc pl-5">
              <li>React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>react-beautiful-dnd</li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Credits</h4>
            <p>© toki 2024</p>
            <p>
              <a 
                href="https://230327tokiex.github.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline"
              >
                GitHub Profile
              </a>
            </p>
          </div>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 font-['Comic_Sans_MS',_'Chalkboard_SE',_'Comic_Neue',_cursive] text-[#FF00FF]">Settings</h2>
      <div className="flex mb-4  font-['Comic_Sans_MS',_'Chalkboard_SE',_'Comic_Neue',_cursive] text-[#FF00FF]">
        <button
          className={`px-4 py-2 ${activeTab === 'projects' ? 'bg-[#FFFFA0]' : 'bg-white'} border-b-2 ${activeTab === 'projects' ? 'border-[#FF00FF]' : 'border-transparent'}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'columns' ? 'bg-[#FFFFA0]' : 'bg-white'} border-b-2 ${activeTab === 'columns' ? 'border-[#FF00FF]' : 'border-transparent'}`}
          onClick={() => setActiveTab('columns')}
        >
          Columns
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'help' ? 'bg-[#FFFFA0]' : 'bg-white'} border-b-2 ${activeTab === 'help' ? 'border-[#FF00FF]' : 'border-transparent'}`}
          onClick={() => setActiveTab('help')}
        >
          Help
        </button>
      </div>
      <div className="max-h-[60vh] overflow-y-auto  font-['Comic_Sans_MS',_'Chalkboard_SE',_'Comic_Neue',_cursive] text-[#FF00FF]">
        {renderTabContent()}
      </div>
    </Modal>
  );
};

export default SettingsModal;