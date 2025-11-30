"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMessageCircle } from 'react-icons/fi';
import { FaStethoscope } from 'react-icons/fa'; // From Font Awesome
import Link from 'next/link';

// --- Message Type Definition ---
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

// Function to format time
const getTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

// --- Mock AI Response Logic (Backend Simulation) ---
const getMockAIResponse = (userMessage: string): string => {
  const lowerCaseMsg = userMessage.toLowerCase();
  
  if (lowerCaseMsg.includes('symptom') || lowerCaseMsg.includes('hurt') || lowerCaseMsg.includes('fever')) {
    return "I understand you're experiencing some symptoms. Please remember I am an AI, not a doctor. Based on your input, I suggest you consider consulting a general practitioner. Would you like me to help you find a doctor nearby?";
  }
  if (lowerCaseMsg.includes('appointment') || lowerCaseMsg.includes('book')) {
    return "I can certainly assist with booking! Which specialty or hospital are you interested in? I can check real-time availability for you.";
  }
  if (lowerCaseMsg.includes('hello') || lowerCaseMsg.includes('hi') || lowerCaseMsg.includes('hey')) {
    return "Hello! I am MedAI, your intelligent health assistant. I am ready 24/7. How can I assist you with your health questions or bookings today?";
  }
  if (lowerCaseMsg.includes('diagnosis') || lowerCaseMsg.includes('test result')) {
    return "For accurate diagnosis or interpreting test results, it's best to consult a specialist. I can schedule a video consultation for you right now, or find a clinic.";
  }
  return "That's an interesting query. I am constantly learning! Can you tell me more about what you are looking for, or ask about symptoms, booking appointments, or general health knowledge?";
};


// --- Chat Bubble Component ---
const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white self-end rounded-br-none'
    : 'bg-gray-100 text-slate-800 self-start rounded-tl-none border border-gray-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`max-w-[80%] p-3 rounded-xl shadow-sm my-1 ${bubbleClasses}`}
    >
      <p className="whitespace-pre-wrap">{message.text}</p>
      <span className={`text-[10px] mt-1 block ${isUser ? 'text-blue-200' : 'text-slate-500'} text-right`}>
        {message.timestamp}
      </span>
    </motion.div>
  );
};

// --- Main AI Assistant Page Component ---
export default function AIAssistantPage() {
  const initialMessage: Message = {
    id: 1,
    text: "Welcome! I am MedAI, your intelligent health assistant. I can help you with preliminary symptom checks, doctor bookings, and general health queries. How can I assist you today?",
    sender: 'ai',
    timestamp: getTime(),
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
      timestamp: getTime(),
    };

    // 1. Display user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // 2. Simulate AI thinking delay and response typing
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    const rawAIResponse = getMockAIResponse(userMessage.text);
    let aiResponseText = '';

    const typingInterval = setInterval(() => {
        if (aiResponseText.length < rawAIResponse.length) {
            aiResponseText += rawAIResponse[aiResponseText.length];
            
            // Update the state with the typing message
            setMessages(prev => {
                const updatedMessages = [...prev];
                const aiMessagePlaceholderId = userMessage.id + 1;
                
                // Check if the AI typing placeholder exists
                let placeholderIndex = updatedMessages.findIndex(m => m.id === aiMessagePlaceholderId);
                
                if (placeholderIndex === -1) {
                    // Create a new placeholder message
                    updatedMessages.push({
                        id: aiMessagePlaceholderId,
                        text: aiResponseText,
                        sender: 'ai',
                        timestamp: getTime(),
                    });
                } else {
                    // Update the existing placeholder message
                     updatedMessages[placeholderIndex].text = aiResponseText;
                }
                return updatedMessages;
            });
        } else {
            // Typing finished
            clearInterval(typingInterval);
            setIsTyping(false);
            
            // Finalize the timestamp of the AI's message
            setMessages(prev => {
                const finalMessages = [...prev];
                const placeholderIndex = finalMessages.findIndex(m => m.id === userMessage.id + 1);
                
                if (placeholderIndex !== -1) {
                    finalMessages[placeholderIndex].timestamp = getTime();
                }
                return finalMessages;
            });
        }
    }, 30); // Typing speed in milliseconds
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header/Nav */}
      <header className="w-full bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-900 hover:text-blue-600 transition">
            <FaStethoscope className="text-2xl text-blue-600" />
            <h1 className="text-xl font-bold">MedAI Hub</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500 hidden sm:block">AI Assistant Beta</span>
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-blue-200"
        >
          {/* Chat Title Bar */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-start rounded-t-3xl shadow-lg">
            <FiMessageCircle className="text-2xl mr-3" />
            <h2 className="text-xl font-semibold">MedAI Live Chat Assistant</h2>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-blue-50">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {isTyping && (
                // Simple typing indicator
              <div className="self-start max-w-[80%] p-3 rounded-xl rounded-tl-none bg-gray-200 text-slate-600 shadow-sm my-1 text-sm italic">
                MedAI is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isTyping ? "Please wait for the response..." : "Ask about symptoms, booking, or health tips..."}
                disabled={isTyping}
                className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <motion.button
                type="submit"
                disabled={input.trim() === '' || isTyping}
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiSend className="text-xl" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}