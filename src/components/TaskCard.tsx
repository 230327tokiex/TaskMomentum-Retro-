import React, { useState } from 'react';
import { Edit2, Check, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: () => void;
  onEdit: (newContent: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.content);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(editedContent);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white bg-opacity-100 backdrop-blur-lg rounded-sm  p-3 mb-2 relative group border border-[#FF00FF] border-dashed">
      <div className="min-h-[24px]">
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded"
            autoFocus
          />
        ) : (
          <p className="text-sm font-medium text-[#FF00FF]  break-words">{task.content}</p>
        )}
      </div>
      <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleEdit}
          className="p-0.5 rounded text-[#FF00FF] hover:text-[#FF00FF] transition-colors duration-200"
          aria-label={isEditing ? "Save" : "Edit"}
        >
          {isEditing ? <Check size={12} /> : <Edit2 size={12} />}
        </button>
        <button
          onClick={onDelete}
          className="p-0.5 rounded text-[#FF00FF] hover:text-[#FF00FF] transition-colors duration-200"
          aria-label="Delete"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;