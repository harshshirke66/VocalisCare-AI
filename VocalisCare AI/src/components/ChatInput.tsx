import React from 'react';
import { Mic, Send, Volume2, VolumeX, Loader2, MapPin, Camera } from 'lucide-react';

interface ChatInputProps {
  inputText: string;
  isListening: boolean;
  isSpeaking: boolean;
  placeholder: string;
  onInputChange: (text: string) => void;
  onSend: () => void;
  onToggleListening: () => void;
  onToggleSpeaking: () => void;
  onFindHospitals: () => void;
  onOpenScanner: () => void;
}

export function ChatInput({
  inputText,
  isListening,
  isSpeaking,
  placeholder,
  onInputChange,
  onSend,
  onToggleListening,
  onToggleSpeaking,
  onFindHospitals,
  onOpenScanner,
}: ChatInputProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleListening}
          className={`p-2 sm:p-3 rounded-full transition-all flex-shrink-0 ${
            isListening
              ? 'bg-red-500 animate-pulse'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          title="Voice Input"
        >
          {isListening ? (
            <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
          ) : (
            <Mic className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
        
        <input
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-white/10 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
        />
        
        <button
          onClick={onSend}
          className="p-2 sm:p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors flex-shrink-0"
          title="Send Message"
        >
          <Send className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        
        <button
          onClick={onToggleSpeaking}
          className={`p-2 sm:p-3 rounded-full transition-colors flex-shrink-0 ${
            isSpeaking ? 'bg-red-500' : 'bg-gray-600'
          }`}
          title="Toggle Voice Response"
        >
          {isSpeaking ? (
            <VolumeX className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onFindHospitals}
          className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-full py-2 px-4"
          title="Find Nearby Hospitals"
        >
          <MapPin className="h-5 w-5" />
          <span className="text-sm sm:text-base">Find Hospitals</span>
        </button>
        
        <button
          onClick={onOpenScanner}
          className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full py-2 px-4"
          title="Scan Medicine"
        >
          <Camera className="h-5 w-5" />
          <span className="text-sm sm:text-base">Scan Medicine</span>
        </button>
      </div>
    </div>
  );
}