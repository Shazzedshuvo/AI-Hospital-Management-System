"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiMicOff, FiSearch, FiCheckCircle, FiArrowRight, FiList, FiAlertTriangle } from 'react-icons/fi';
import { FaMicrophoneAlt } from 'react-icons/fa'; 

// --- Mock Suggestions List ---
const MOCK_SUGGESTIONS: string[] = [
    "General Consultation booking time",
    "Emergency Care options near me",
    "How to book a Diagnostic test?",
    "Vaccination schedule for children",
    "Physiotherapy for back pain",
    "Find a good Dental Care clinic",
];

// --- Dynamic Placeholder Texts ---
const PLACEHOLDER_TEXTS: string[] = [
    "Search with AI: 'Book a dental checkup'",
    "Try voice search: 'I have a fever'",
    "Ask a quick query: 'Nearest pharmacy'",
    "Type or speak your health query...",
];

// Web Speech API-র জন্য গ্লোবাল টাইপ ডিক্লেয়ারেশন
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// --- Voice & Text Search Component ---
export default function VoiceSearchComponent({ onSearchSubmit }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(PLACEHOLDER_TEXTS[0]); // For dynamic text
  
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  // --- Dynamic Placeholder Effect ---
  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentPlaceholder(prev => {
            const currentIndex = PLACEHOLDER_TEXTS.indexOf(prev);
            const nextIndex = (currentIndex + 1) % PLACEHOLDER_TEXTS.length;
            return PLACEHOLDER_TEXTS[nextIndex];
        });
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  // --- Speech Recognition Setup ---
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false; 
      recognition.interimResults = false; 
      recognition.lang = 'bn-BD'; 

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setError('');
        setShowSuggestions(false); 
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
        onSearchSubmit(result); 
      };

      recognition.onerror = (event) => {
        setError(`Recognition Error: ${event.error}. Please try again.`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;

    } else {
      setIsSupported(false);
      setError("Voice Search is not supported by your browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onSearchSubmit]);


  const toggleListening = () => {
    if (!recognitionRef.current || !isSupported) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript(''); 
      recognitionRef.current.start();
    }
  };
  
  const handleTextChange = (e) => {
      const text = e.target.value;
      setTranscript(text);
      if (!isListening && text.trim().length > 2) { 
          setShowSuggestions(true);
      } else {
          setShowSuggestions(false);
      }
  };

  const handleSuggestionClick = (suggestion) => {
      setTranscript(suggestion);
      setShowSuggestions(false);
      onSearchSubmit(suggestion);
  };

  const handleFormSubmit = (e) => {
      e.preventDefault();
      if (transcript.trim()) {
          onSearchSubmit(transcript);
          setShowSuggestions(false);
      }
  };

  const filteredSuggestions = MOCK_SUGGESTIONS.filter(suggestion => 
      suggestion.toLowerCase().includes(transcript.toLowerCase())
  );
  
  // --- Voice Button Animation Setup (Updated for dynamic ring/shadow) ---
  const pulseAnimation = {
      // White button on blue ring effect
      scale: [1, 1.05, 1],
      boxShadow: [
          "0 0 0 0 rgba(59, 130, 246, 0.5)", 
          "0 0 0 8px rgba(59, 130, 246, 0)", 
          "0 0 0 0 rgba(59, 130, 246, 0.5)"
      ],
      transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
      },
  };
  
  // --- User Guide Lines ---
  const guideLines = [
      "Type your query or click the pulsing mic to speak.",
      "Suggestions appear as you type for quicker results.",
      "Press Enter or the blue arrow to submit your query.",
  ];

  return (
    // Reusable container with modern design
    <div className="p-6 md:p-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border-t-4 border-blue-500 max-w-2xl mx-auto">
      
      <h3 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center justify-center">
        <FiSearch className="mr-3 text-blue-600 text-3xl" /> Search with AI Assistant 
      </h3>
      
      {/* Search Input, Voice Button and Suggestions */}
      <form onSubmit={handleFormSubmit} className="relative mb-6">
        
        <div className="flex items-stretch space-x-3">
          
          {/* Voice Button (Dynamic Pulse Animation) */}
          {isSupported && (
            <motion.button
              type="button" 
              onClick={toggleListening}
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 transform ${
                // Fixed: White background, Blue/Red text
                isListening 
                  ? 'bg-white border-2 border-red-500 text-red-500 shadow-md animate-pulse' 
                  : 'bg-white border-2 border-blue-500 text-blue-600 shadow-md hover:shadow-lg'
              }`}
              whileTap={{ scale: 0.9 }}
              title={isListening ? 'Stop Voice Input' : 'Start Voice Input (AI Search)'}
              // Apply pulse animation when NOT listening (to encourage use)
              animate={!isListening ? pulseAnimation : {}}
            >
              {isListening ? (
                <FiMicOff className="text-2xl" />
              ) : (
                <FaMicrophoneAlt className="text-xl" />
              )}
            </motion.button>
          )}

          {/* Text Input Field */}
          <div className="flex-grow relative">
            <input
              ref={inputRef}
              type="text"
              value={transcript}
              onChange={handleTextChange}
              onFocus={() => transcript.length > 2 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              // Dynamic Placeholder Text
              placeholder={isListening ? 'Listening for your query...' : currentPlaceholder} 
              className="w-full h-14 p-4 pr-12 text-base border border-gray-300 rounded-xl bg-gray-50 shadow-inner focus:border-blue-500 focus:outline-none transition"
              aria-label="Search Input"
              autoComplete="off"
            />
            {/* Search Submit Button inside the input field */}
            <motion.button
                type="submit"
                className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-blue-600 hover:text-blue-800 transition disabled:text-gray-400"
                disabled={!transcript.trim() || isListening} 
                title="Submit Query"
                whileTap={{ scale: 0.9 }}
            >
                <FiArrowRight className="text-xl" />
            </motion.button>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
            {showSuggestions && filteredSuggestions.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
                >
                    <div className="p-2 text-xs font-semibold text-slate-500 flex items-center border-b">
                        <FiList className="mr-1" /> Quick Suggestions
                    </div>
                    {filteredSuggestions.map((suggestion, index) => (
                        <motion.button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full p-3 text-sm text-left text-slate-800 hover:bg-blue-50 flex items-center transition duration-150 border-b last:border-b-0"
                            whileHover={{ backgroundColor: '#eff6ff' }}
                        >
                            <FiArrowRight className="mr-2 text-blue-500" /> {suggestion}
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
      </form>

      {/* Status and Guide Lines */}
      
      {/* 1. Error/Support Message */}
      {error && (
        <p className={`mt-3 text-sm flex items-center font-medium p-2 rounded-lg ${isSupported ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>
            <FiAlertTriangle className="mr-2 flex-shrink-0" /> {error}
        </p>
      )}
      
      {/* 2. Guide Points */}
      <div className="space-y-2 mt-4">
          {guideLines.map((line, index) => (
              <div key={index} className="flex items-start text-slate-600 text-sm">
                  <FiCheckCircle className="mt-1 mr-2 text-green-500 flex-shrink-0" />
                  <p>{line}</p>
              </div>
          ))}
      </div>

    </div>
  );
}