import React from 'react';
import Modal from './Modal';
import { Project, TasksState } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  progress: number;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, project, progress }) => {
  const generateReport = (): string => {
    const currentDateTime = new Date().toLocaleString('en-US', { 
      year: 'numeric', month: '2-digit', day: '2-digit', 
      weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });

    const report = `# Task Status Report: ${project.name}

Generated: ${currentDateTime}

Overall Progress: ${progress}%

${project.columns.map(column => `## ${column}

${project.tasks[column]?.map((task, index) => `${index + 1}. ${task.content}`).join('\n') || 'No tasks'}`).join('\n\n')}
`;

    return report;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-[#FF00FF] font-['Comic_Sans_MS',_'Chalkboard_SE',_'Comic_Neue',_cursive]">Task Status Report</h2>
      <div className="max-h-[60vh] overflow-y-auto">
        <pre className="whitespace-pre-wrap font-mono text-sm bg-[#FFFFA0] p-4 rounded">
          {generateReport()}
        </pre>
      </div>
    </Modal>
  );
};

export default ReportModal;