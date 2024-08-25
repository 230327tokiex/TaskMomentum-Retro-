// eslint-disable-next-line @typescript-eslint/no-explicit-any

import React from 'react';
import { Save, Trash2, FileText } from 'lucide-react';

interface ActionButtonsProps {
  onSave: () => void;
  onClear: () => void;
  onGenerateReport: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onClear, onGenerateReport }) => (
  <div className="flex justify-end space-x-2 mb-8">
    <button onClick={onSave} className="bg-[#FF00FF] text-white p-2 rounded-lg hover:bg-[#FFA0FF] transition duration-200">
    💾
    </button>
    <button onClick={onClear} className="bg-[#FF00FF] text-white p-2 rounded-lg hover:bg-[#FFA0FF] transition duration-200">
    🗑️
    </button>
    <button onClick={onGenerateReport} className="bg-[#FF00FF] text-white p-2 rounded-lg hover:bg-[#FFA0FF] transition duration-200">
    📝
    </button>
  </div>
);

export default ActionButtons;