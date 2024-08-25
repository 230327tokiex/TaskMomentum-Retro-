import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Calendar, Clock, Settings } from 'lucide-react';
import ProjectSelector from './components/ProjectSelector';
import TaskInput from './components/TaskInput';
import ProjectBoard from './components/ProjectBoard';
import SettingsModal from './components/SettingsModal';
import ReportModal from './components/ReportModal';
import ProgressBar from './components/ProgressBar';
import ActionButtons from './components/ActionButtons';
import { Project, Task, TasksState } from './types';
import { defaultColumns } from './utils/constants';
import useLocalStorage from './hooks/useLocalStorage';

const emojis = ['🧸', '🪐', '🍬', '🍹', '🚗', '🦈', '🛸', '🖤', 
  '👾', '👻', '💣', '🦒', '🏝️', '🎠', '🚂', '🐣', '🌻', '🦑'];

const RandomEmoji: React.FC = () => {
const [emoji, setEmoji] = useState('');

useEffect(() => {
  setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
}, []);

return <span>{emoji}</span>;
};


const App: React.FC = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', [
    { id: '1', name: 'Default Project', columns: defaultColumns, tasks: {} }
  ]);
  const [currentProjectId, setCurrentProjectId] = useLocalStorage<string>('currentProjectId', '1');
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0];

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateProgress = (tasks: TasksState): number => {
    const totalTasks = Object.values(tasks).flat().length;
    const doneTasks = tasks['Done']?.length || 0;
    return totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);
  };

  const addTask = (taskContent: string): void => {
    if (taskContent && currentProject.columns.length > 0) {
      const newTaskObj: Task = { id: Date.now().toString(), content: taskContent };
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === currentProjectId
            ? {
                ...project,
                tasks: {
                  ...project.tasks,
                  [project.columns[0]]: [...(project.tasks[project.columns[0]] || []), newTaskObj]
                }
              }
            : project
        )
      );
    }
  };

  const deleteTask = (column: string, taskIndex: number): void => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === currentProjectId
          ? {
              ...project,
              tasks: {
                ...project.tasks,
                [column]: project.tasks[column].filter((_, index) => index !== taskIndex)
              }
            }
          : project
      )
    );
  };

  const editTask = (column: string, taskIndex: number, newContent: string): void => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === currentProjectId
          ? {
              ...project,
              tasks: {
                ...project.tasks,
                [column]: project.tasks[column].map((task, index) => 
                  index === taskIndex ? { ...task, content: newContent } : task
                )
              }
            }
          : project
      )
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    setProjects(prevProjects => 
      prevProjects.map(project => {
        if (project.id !== currentProjectId) return project;

        const newTasks = {...project.tasks};
        
        if (source.droppableId === destination.droppableId) {
          const column = source.droppableId;
          const columnTasks = Array.isArray(newTasks[column]) ? [...newTasks[column]] : [];
          const [reorderedItem] = columnTasks.splice(source.index, 1);
          columnTasks.splice(destination.index, 0, reorderedItem);
          newTasks[column] = columnTasks;
        } else {
          const sourceColumn = source.droppableId;
          const destColumn = destination.droppableId;
          const sourceTasks = Array.isArray(newTasks[sourceColumn]) ? [...newTasks[sourceColumn]] : [];
          const destTasks = Array.isArray(newTasks[destColumn]) ? [...newTasks[destColumn]] : [];
          const [movedItem] = sourceTasks.splice(source.index, 1);
          destTasks.splice(destination.index, 0, movedItem);
          newTasks[sourceColumn] = sourceTasks;
          newTasks[destColumn] = destTasks;
        }

        return {...project, tasks: newTasks};
      })
    );
  };

  const addProject = (name: string): void => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: name,
      columns: defaultColumns,
      tasks: defaultColumns.reduce((acc, column) => {
        acc[column] = [];
        return acc;
      }, {} as TasksState)
    };
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  const deleteProject = (projectId: string): void => {
    if (projects.length > 1) {
      setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
      if (currentProjectId === projectId) {
        setCurrentProjectId(projects.find(p => p.id !== projectId)!.id);
      }
    } else {
      alert('Cannot delete the last project');
    }
  };

  const addColumn = (columnName: string): void => {
    if (columnName && !currentProject.columns.includes(columnName)) {
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === currentProjectId
            ? {
                ...project,
                columns: [...project.columns, columnName],
                tasks: {...project.tasks, [columnName]: []}
              }
            : project
        )
      );
    }
  };

  const removeColumn = (columnName: string): void => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === currentProjectId
          ? {
              ...project,
              columns: project.columns.filter(col => col !== columnName),
              tasks: Object.fromEntries(
                Object.entries(project.tasks).filter(([key]) => key !== columnName)
              )
            }
          : project
      )
    );
  };

  const resetColumns = (): void => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === currentProjectId
          ? {
              ...project,
              columns: defaultColumns,
              tasks: defaultColumns.reduce((acc, column) => {
                acc[column] = project.tasks[column] || [];
                return acc;
              }, {} as TasksState)
            }
          : project
      )
    );
  };

  const saveToLocalStorage = (): void => {
    localStorage.setItem('projects', JSON.stringify(projects));
    alert('All projects saved to local storage');
  };

  const clearAllTasks = (): void => {
    if (window.confirm('Are you sure you want to delete all tasks in the current project?')) {
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === currentProjectId
            ? {
                ...project,
                tasks: project.columns.reduce((acc, column) => {
                  acc[column] = [];
                  return acc;
                }, {} as TasksState)
              }
            : project
        )
      );
      alert('All tasks in the current project have been cleared');
    }
  };
  const generateReport = (): void => {
    setIsReportModalOpen(true);
  };

  return (
    <div className="min-h-screen  bg-[#A0FFFF] p-8">
      <div className="max-w-[2000px] mx-auto  bg-[#ffffff] bg-opacity-100 backdrop-blur-lg rounded-xl overflow-hidden border-4 border-[#FF00FF] border-dashed font-['Comic_Sans_MS',_'Chalkboard_SE',_'Comic_Neue',_cursive]">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-[#FF00FF]  tracking-tight">TaskMomentum(Retro)</h1>
            <div className="flex items-center space-x-4 ">
              <ProjectSelector
                projects={projects}
                currentProject={currentProject}
                onProjectSelect={setCurrentProjectId}
              />
              <div className="flex items-center bg-[#FF00FF] rounded-lg px-3 py-2">
              <RandomEmoji />
                <span className="text-white font-medium">
                  {currentDateTime.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center bg-[#FF00FF] rounded-lg px-3 py-2">
              <RandomEmoji />
                <span className="text-white font-medium">
                  {currentDateTime.toLocaleTimeString()}
                </span>
              </div>
              <button onClick={() => setIsSettingsModalOpen(true)} className="bg-[#FF00FF] text-white p-2 rounded-lg hover:bg-[#FF00FF] transition duration-200">
              ⚙️
              </button>
            </div>
          </div>

          <ProgressBar progress={calculateProgress(currentProject.tasks)} />
        
          <TaskInput onAddTask={addTask} />

          <ActionButtons
            onSave={saveToLocalStorage}
            onClear={clearAllTasks}
            onGenerateReport={generateReport}
          />

          <DragDropContext onDragEnd={onDragEnd}>
            <ProjectBoard
              project={currentProject}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
            />
          </DragDropContext>
        </div>
      </div>

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        projects={projects}
        currentProject={currentProject}
        onAddProject={addProject}
        onDeleteProject={deleteProject}
        onAddColumn={addColumn}
        onRemoveColumn={removeColumn}
        onResetColumns={resetColumns}
      />
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        project={currentProject}
        progress={calculateProgress(currentProject.tasks)}
      />
    </div>
  );
};

export default App;