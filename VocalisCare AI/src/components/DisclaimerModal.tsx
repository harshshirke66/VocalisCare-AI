import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DisclaimerModal({ isOpen, onClose, onConfirm }: DisclaimerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2 text-yellow-400">
            <AlertTriangle className="h-6 w-6" />
            <h3 className="text-xl font-bold text-white">Important Notice</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 text-blue-100">
          <p>
            This AI health assistant is for educational purposes only. The information provided should not be considered as medical advice.
          </p>
          <p>
            Always consult with qualified healthcare professionals for medical diagnosis, treatment, or any health-related decisions.
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white/80 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}