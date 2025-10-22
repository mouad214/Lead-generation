
import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title: string;
}

const GeneratedMessageModal: React.FC<ModalProps> = ({ isOpen, onClose, message, title }) => {
  const [copyButtonText, setCopyButtonText] = useState('نسخ الرسالة');

  useEffect(() => {
    if (isOpen) {
      setCopyButtonText('نسخ الرسالة');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopyButtonText('تم النسخ!');
    setTimeout(() => {
      setCopyButtonText('نسخ الرسالة');
    }, 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-11/12 max-w-lg relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 left-4 text-slate-400 hover:text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-xl font-bold text-teal-700 mb-4">{title}</h3>
        <div className="bg-slate-50 p-4 rounded-md border border-slate-200 mb-6">
          <p className="text-slate-700 whitespace-pre-wrap">{message}</p>
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200">
            إغلاق
          </button>
          <button onClick={handleCopy} className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700">
            {copyButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedMessageModal;
