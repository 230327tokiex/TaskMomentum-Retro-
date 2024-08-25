// eslint-disable-next-line @typescript-eslint/no-explicit-any

import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="mb-8 bg-white rounded-lg p-4 text-[#FF00FF] ">
    <div className="flex justify-between items-center mb-2">
      <span className="text-lg font-semibold text-[#FF00FF]">Overall Progress</span>
      <span className="text-2xl font-bold text-[#FF00FF]">{progress}%</span>
    </div>
    <div className="h-4 w-full bg-[#A0FFFF] rounded-full overflow-hidden">
      <div 
        className="h-full bg-[#FF00FF] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

export default ProgressBar;