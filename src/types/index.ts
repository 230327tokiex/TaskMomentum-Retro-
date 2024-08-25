export interface Task {
  id: string;
  content: string;
}

export interface TasksState {
  [key: string]: Task[];
}

export interface Project {
  id: string;
  name: string;
  columns: string[];
  tasks: TasksState;
}