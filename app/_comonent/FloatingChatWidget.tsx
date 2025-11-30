"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiMinimize2, FiPhoneCall } from 'react-icons/fi';
import { FaStethoscope } from 'react-icons/fa';

// --- Message Types & Mock AI Logic (Previous Logic Reused) ---
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const getTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

const getMockAIResponse = (userMessage: string): string => {
  const lowerCaseMsg = userMessage.toLowerCase();
  
  if (lowerCaseMsg.includes('symptom') || lowerCaseMsg.includes('hurt') || lowerCaseMsg.includes('fever')) {
    return "I recommend a consultation based on your symptoms. Shall I help you book a specialist now?";
  }
  if (lowerCaseMsg.includes('appointment') || lowerCaseMsg.includes('book')) {
    return "Yes, I can check real-time availability. Which specialty do you need (e.g., Cardiology, Neurology)?";
  }
  if (lowerCaseMsg.includes('hello') || lowerCaseMsg.includes('hi')) {
    return "Hello! I am MedAI, your intelligent assistant. How may I help you today?";
  }
  return "I'm not sure about that specific query, but I can assist with health checks, doctor bookings, or general wellness tips!";
};

// --- Contact Info ---
const SHAZZED_CONTACT = {
    name: "ShazzedShuvo",
    phone: "01719052334",
};

// --- Chat Bubble Component (Reused) ---
const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';
    const bubbleClasses = isUser
        ? 'bg-blue-600 text-white self-end rounded-br-none'
        : 'bg-gray-100 text-slate-800 self-start rounded-tl-none';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`max-w-[85%] p-3 rounded-xl my-1 shadow-sm ${bubbleClasses}`}
        >
            <p className="whitespace-pre-wrap text-sm">{message.text}</p>
            <span className={`text-[9px] mt-1 block ${isUser ? 'text-blue-200' : 'text-slate-500'} text-right`}>
                {message.timestamp}
            </span>
        </motion.div>
    );
};

// --- Floating Chat Widget Component ---
export default function FloatingChatWidget() {
  const initialMessage: Message = {
    id: 1,
    text: "Hi! I am MedAI, your 24/7 health assistant. Ask me anything about symptoms or booking appointments.",
    sender: 'ai',
    timestamp: getTime(),
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);


  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
      timestamp: getTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const rawAIResponse = getMockAIResponse(userMessage.text);
    let aiResponseText = '';

    const aiMessagePlaceholderId = userMessage.id + 1;
    
    setMessages(prev => [...prev, {
        id: aiMessagePlaceholderId,
        text: '', 
        sender: 'ai',
        timestamp: 'Typing...',
    }]);

    const typingInterval = setInterval(() => {
        if (aiResponseText.length < rawAIResponse.length) {
            aiResponseText += rawAIResponse[aiResponseText.length];
            
            setMessages(prev => {
                const updatedMessages = [...prev];
                let placeholderIndex = updatedMessages.findIndex(m => m.id === aiMessagePlaceholderId);
                
                if (placeholderIndex !== -1) {
                     updatedMessages[placeholderIndex].text = aiResponseText;
                }
                return updatedMessages;
            });
        } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            
            setMessages(prev => {
                const finalMessages = [...prev];
                const placeholderIndex = finalMessages.findIndex(m => m.id === aiMessagePlaceholderId);
                
                if (placeholderIndex !== -1) {
                    finalMessages[placeholderIndex].timestamp = getTime();
                }
                return finalMessages;
            });
        }
    }, 25);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]"> 
      
      {/* 1. Chat Pop-up Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-80 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-blue-200"
          >
            {/* Widget Header (Added Contact Info) */}
            <div className="bg-blue-600 text-white p-3 flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                    <FaStethoscope className="text-xl mr-2" />
                    <h3 className="text-sm font-semibold">MedAI Chat</h3>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="p-1 rounded-full hover:bg-blue-700 transition"
                        title="Minimize"
                    >
                        <FiMinimize2 className="text-sm" />
                    </button>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="p-1 rounded-full hover:bg-red-500 transition"
                        title="Close"
                    >
                        <FiX className="text-sm" />
                    </button>
                </div>
              </div>
              
              {/* Emergency Contact Line */}
              <a 
                href={`tel:${SHAZZED_CONTACT.phone}`}
                className="flex items-center justify-center bg-blue-700/80 text-white text-[11px] font-medium p-1 rounded-full hover:bg-blue-700 transition"
                title="Emergency Contact"
              >
                <FiPhoneCall className="text-sm mr-1" />
                Urgent: {SHAZZED_CONTACT.name} ({SHAZZED_CONTACT.phone})
              </a>

            </div>

            {/* Messages Area */}
            <div className="flex-grow p-3 space-y-2 overflow-y-auto bg-blue-50">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <div className="self-start max-w-[85%] p-2 rounded-xl rounded-tl-none bg-gray-200 text-slate-600 shadow-sm my-1 text-xs italic">
                  MedAI is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your health query..."
                  disabled={isTyping}
                  className="flex-grow p-2 text-sm border border-gray-300 rounded-full focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <motion.button
                  type="submit"
                  disabled={input.trim() === '' || isTyping}
                  className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition disabled:bg-gray-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiSend className="text-lg" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Action Button (FAB) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-300 transform ${
          isOpen ? 'bg-red-500 hover:bg-red-600 rotate-45' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <FiX className="text-white text-2xl" />
        ) : (
          <FiMessageCircle className="text-white text-2xl" />
        )}
      </motion.button>

    </div>
  );
}