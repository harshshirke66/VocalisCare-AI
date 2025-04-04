import React, { useState } from 'react';
import { Brain, ArrowRight, MessageSquare, Globe2, Sparkles, Volume2, Shield, Cpu } from 'lucide-react';
import { DisclaimerModal } from './DisclaimerModal';

interface HomePageProps {
  onStartJourney: () => void;
}

export function HomePage({ onStartJourney }: HomePageProps) {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const handleGetStarted = () => {
    setIsDisclaimerOpen(true);
  };

  const handleDisclaimerConfirm = () => {
    setIsDisclaimerOpen(false);
    onStartJourney();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="flex justify-center mb-6 relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-blue-400/20"></div>
              <Brain className="h-16 w-16 text-blue-400 relative animate-float" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 animate-fade-in">
            VocalisCare AI
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in-up">
              Your personal AI health assistant that understands and responds in your language
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
              <button 
                onClick={handleGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 animate-pulse"
              >
                <span className="flex items-center justify-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 transform hover:scale-105 transition-transform duration-300">
              <MessageSquare className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">AI Health Assistant</h3>
              <p className="text-blue-100">
                Get instant responses to your health questions with our AI-powered assistant
              </p>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 transform hover:scale-105 transition-transform duration-300">
              <Globe2 className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">Multilingual Support</h3>
              <p className="text-blue-100">
                Communicate in your preferred language with our multilingual capabilities
              </p>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 transform hover:scale-105 transition-transform duration-300">
              <Volume2 className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">Voice Interaction</h3>
              <p className="text-blue-100">
                Speak with your AI assistant and listen to responses in your language
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Cybertrone Section - New Design */}
      <section className="relative w-full px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-black/40 rounded-2xl p-8 overflow-hidden">
            {/* Animated Circuit Lines */}
            <div className="absolute inset-0">
              <div className="circuit-pattern"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
                <Shield className="h-8 w-8 text-cyan-400 animate-pulse" />
                <div className="w-16 h-1 bg-gradient-to-l from-cyan-500 to-transparent rounded-full"></div>
              </div>
              
              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 inline-flex items-center gap-3 justify-center">
                  <Cpu className="h-8 w-8 text-cyan-400 animate-spin-slow" />
                  TEAM CYBERTRON
                  <Cpu className="h-8 w-8 text-purple-400 animate-spin-slow" />
                </h2>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl"></div>
                <p className="relative text-lg text-center text-cyan-300 font-light tracking-wide">
                  Pushing the boundaries of healthcare innovation with cutting-edge AI technology
                </p>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <p className="text-blue-100">Powered by Google's Gemini AI</p>
          </div>
          <p className="text-blue-100/60">
            © {new Date().getFullYear()} VocalisCare AI AI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        onConfirm={handleDisclaimerConfirm}
      />
    </div>
  );
}