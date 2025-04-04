/* AssistantInterface.tsx */

import React, { useState } from 'react';
import { Brain, X, RefreshCw } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { MedicineScanner } from './MedicineScanner';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  language?: string;
}

interface AssistantInterfaceProps {
  messages: Message[];
  inputText: string;
  isListening: boolean;
  isSpeaking: boolean;
  selectedLanguage: string;
  placeholder: string;
  onClose: () => void;
  onLanguageChange: (code: string) => void;
  onInputChange: (text: string) => void;
  onSend: () => void;
  onToggleListening: () => void;
  onToggleSpeaking: () => void;
  onFindHospitals: () => void;
  onRefreshTip: () => void;
  onAnalyzeMedicine: (imageData: string) => void;
}

export function AssistantInterface({
  messages,
  inputText,
  isListening,
  isSpeaking,
  selectedLanguage,
  placeholder,
  onClose,
  onLanguageChange,
  onInputChange,
  onSend,
  onToggleListening,
  onToggleSpeaking,
  onFindHospitals,
  onRefreshTip,
  onAnalyzeMedicine,
}: AssistantInterfaceProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleScan = async (imageData: string) => {
    setIsAnalyzing(true);
    await onAnalyzeMedicine(imageData);
    setIsAnalyzing(false);
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-black/20 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-400" />
            <span className="font-semibold hidden sm:inline">VocalisCare AI</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onRefreshTip}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Get New Wellness Tip"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
            />
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32 sm:pb-24">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              type={message.type}
              content={message.content}
            />
          ))}
        </div>

        {/* Input Area - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm p-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <ChatInput
              inputText={inputText}
              isListening={isListening}
              isSpeaking={isSpeaking}
              placeholder={placeholder}
              onInputChange={onInputChange}
              onSend={onSend}
              onToggleListening={onToggleListening}
              onToggleSpeaking={onToggleSpeaking}
              onFindHospitals={onFindHospitals}
              onOpenScanner={() => setShowScanner(true)}
            />
          </div>
        </div>

        {/* Medicine Scanner Modal */}
        {showScanner && (
          <MedicineScanner
            onScan={handleScan}
            onClose={() => setShowScanner(false)}
            isAnalyzing={isAnalyzing}
          />
        )}
      </div>
    </div>
  );
}