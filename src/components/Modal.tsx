// eslint-disable-next-line @typescript-eslint/no-explicit-any

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#40FFFF] bg-opacity-100 flex justify-center items-center z-50 ">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[90vh] overflow-auto  border-4 border-[#FF00FF] border-dashed  font-['Comic_Sans_MS',_'Chalkboard_SE',_'Comic_Neue',_cursive]">
        {children}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-[#FF00FF]  text-white px-4 py-2 rounded hover:bg-[#FF00FF] ">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;