// eslint-disable-next-line @typescript-eslint/no-explicit-any


import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';


interface TaskInputProps {
  onAddTask: (taskContent: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <div className="flex mb-8 space-x-2">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        placeholder="Enter a new task"
        className="flex-grow px-4 py-2 rounded-lg focus:outline-none bg-white  placeholder-[#FFA0FF]  border-2 border-[#FF00FF] text-[#FF00FF]"
      />
      <button
        onClick={handleAddTask}
        className="bg-[#FF00FF] text-white p-2 rounded-lg hover:bg-[#FFA0FF] transition duration-200"
      >
        🚀
      </button>
    </div>
  );
};

export default TaskInput;