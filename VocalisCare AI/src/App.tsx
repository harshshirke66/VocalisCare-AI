import React, { useState, useEffect, useCallback } from 'react';
import { AssistantInterface } from './components/AssistantInterface';
import { getHealthAdvice, analyzeSymptomsUrgency, getWellnessTip, analyzeMedicineImage } from './lib/gemini';
import { LANGUAGES, UI_TRANSLATIONS } from './config/languages';
import { HomePage } from './components/HomePage';

export default function App() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant'; content: string }>>([]);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [dailyTip, setDailyTip] = useState('');

  useEffect(() => {const initializeChat = async () => {
      const tip = await getWellnessTip(selectedLanguage);
      setDailyTip(tip);
      
      setMessages([
        {
          type: 'assistant',
          content: UI_TRANSLATIONS[selectedLanguage]?.welcome || UI_TRANSLATIONS.en.welcome
        },
        {
          type: 'assistant',
          content: `💡 Daily Wellness Tip: ${tip}`
        }
      ]);
    };

    initializeChat();
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [selectedLanguage]);

  const getVoiceForLanguage = useCallback((languageCode: string) => {
    let voice = availableVoices.find(v => v.lang.toLowerCase().startsWith(LANGUAGES[languageCode].code.toLowerCase()));
    
    if (!voice) {
      const languageFamily = LANGUAGES[languageCode].code.split('-')[0];
      voice = availableVoices.find(v => v.lang.toLowerCase().startsWith(languageFamily));
    }
    
    if (!voice) {
      voice = availableVoices.find(v => v.lang.startsWith('en'));
    }
    
    return voice || null;
  }, [availableVoices]);

  const speakText = useCallback((text: string, languageCode: string) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getVoiceForLanguage(languageCode);
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = LANGUAGES[languageCode].code;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('No suitable voice found for language:', languageCode);
    }
  }, [getVoiceForLanguage]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = inputText;
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInputText('');
    
    try {
      const urgency = await analyzeSymptomsUrgency(userMessage, selectedLanguage);
      let response = await getHealthAdvice(userMessage, selectedLanguage);
      if (urgency === 'emergency') {
        response = `🚨 IMPORTANT: These symptoms may require immediate medical attention. Please seek emergency care or call emergency services.\n\n${response}`;
      } else if (urgency === 'urgent') {
        response = `⚠️ These symptoms should be evaluated by a healthcare provider soon.\n\n${response}`;
      }
      
      const newMessage = { 
        type: 'assistant', 
        content: response
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      if (!isSpeaking) {
        speakText(response, selectedLanguage);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = UI_TRANSLATIONS[selectedLanguage]?.error || UI_TRANSLATIONS.en.error;
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: errorMessage
      }]);
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = LANGUAGES[selectedLanguage].code;
        
        recognition.onstart = () => {
          setIsListening(true);
          console.log('Speech recognition started');
        };
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsListening(false);
          handleSendMessage();
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
        
        try {
          recognition.start();
        } catch (error) {
          console.error('Error starting speech recognition:', error);
          setIsListening(false);
        }
      } else {
        alert('Speech recognition is not supported in your browser.');
      }
    } else {
      setIsListening(false);
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleFindHospitals = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapsUrl = `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`;
          window.open(mapsUrl, '_blank');
        },
        (error) => {
          console.error('Error getting location:', error);
          const message = UI_TRANSLATIONS[selectedLanguage]?.locationError || UI_TRANSLATIONS.en.locationError;
          setMessages(prev => [...prev, { type: 'assistant', content: message }]);
        }
      );
    } else {
      const message = UI_TRANSLATIONS[selectedLanguage]?.locationNotSupported || UI_TRANSLATIONS.en.locationNotSupported;
      setMessages(prev => [...prev, { type: 'assistant', content: message }]);
    }
  };

  const handleRefreshTip = async () => {
    const newTip = await getWellnessTip(selectedLanguage);
    setDailyTip(newTip);
    setMessages(prev => [...prev, { 
      type: 'assistant', 
      content: `💡 New Wellness Tip: ${newTip}`
    }]);
  };

  const handleAnalyzeMedicine = async (imageData: string) => {
    try {
      const analysis = await analyzeMedicineImage(imageData, selectedLanguage);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: analysis
      }]);
    } catch (error) {
      console.error('Error analyzing medicine:', error);
      const errorMessage = UI_TRANSLATIONS[selectedLanguage]?.medicineAnalysisError || UI_TRANSLATIONS.en.medicineAnalysisError;
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: errorMessage
      }]);
    }
  };

  if (isAssistantOpen) {
    return (
      <AssistantInterface
        messages={messages}
        inputText={inputText}
        isListening={isListening}
        isSpeaking={isSpeaking}
        selectedLanguage={selectedLanguage}
        placeholder={UI_TRANSLATIONS[selectedLanguage]?.typeQuestion || UI_TRANSLATIONS.en.typeQuestion}
        onClose={() => setIsAssistantOpen(false)}
        onLanguageChange={setSelectedLanguage}
        onInputChange={setInputText}
        onSend={handleSendMessage}
        onToggleListening={toggleListening}
        onToggleSpeaking={toggleSpeaking}
        onFindHospitals={handleFindHospitals}
        onRefreshTip={handleRefreshTip}
        onAnalyzeMedicine={handleAnalyzeMedicine}
      />
    );
  }

  return (
    <HomePage onStartJourney={() => setIsAssistantOpen(true)} />
  );
}