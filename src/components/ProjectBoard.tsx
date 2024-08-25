// eslint-disable-next-line @typescript-eslint/no-explicit-any

import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Project, Task } from '../types';
import { columnColors } from '../utils/constants';

interface ProjectBoardProps {
  project: Project;
  onDeleteTask: (column: string, taskIndex: number) => void;
  onEditTask: (column: string, taskIndex: number, newContent: string) => void;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ project, onDeleteTask, onEditTask }) => {
  const gridClass = `grid gap-6 ${
    project.columns.length === 1 ? 'grid-cols-1' :
    project.columns.length === 2 ? 'grid-cols-2' :
    project.columns.length === 3 ? 'grid-cols-3' :
    project.columns.length === 4 ? 'grid-cols-4' :
    project.columns.length === 5 ? 'grid-cols-5' :
    'grid-cols-6'
  }`;

  return (
    <div className={gridClass}>
      {project.columns.map((column, index) => (
        <Droppable droppableId={column} key={column}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${columnColors[index % columnColors.length]} bg-opacity-100 backdrop-blur-sm p-4 rounded-lg`}
            >
              <h2 className="text-xl font-semibold text-[#FF00FF]  mb-4">{column}</h2>
              {project.tasks[column]?.map((task: Task, taskIndex: number) => (
                <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard
                        task={task}
                        onDelete={() => onDeleteTask(column, taskIndex)}
                        onEdit={(newContent) => onEditTask(column, taskIndex, newContent)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export default ProjectBoard;