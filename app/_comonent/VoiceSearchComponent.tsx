"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Prop Interface Definition ---
interface VoiceSearchProps {
    onSearchSubmit: (searchTerm: string) => void;
}

// --- Icon components (Inline SVGs) ---
const IconMic = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
);

const IconSend = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 15 2 11 22 2" />
    </svg>
);

// --- Voice & Text Search Component ---
export default function VoiceSearchComponent({ onSearchSubmit }: VoiceSearchProps) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState('');

    const toggleListening = () => {
        if (isListening) {
            setIsListening(false);
            if (transcript.trim()) {
                onSearchSubmit(transcript);
            } else {
                setError("No voice input detected. Please try again.");
            }
        } else {
            setTranscript('');
            setError('');
            setIsListening(true);

            setTimeout(() => {
                const simulatedResult = "Apollo Hospital Dhaka";
                setTranscript(simulatedResult);
                setIsListening(false);
                onSearchSubmit(simulatedResult);
            }, 2500);
        }
    };

    const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (transcript.trim()) {
            onSearchSubmit(transcript.trim());
            setTranscript('');
        }
    };

    return (
        <div className="flex flex-col space-y-3">
            <form onSubmit={handleTextSubmit} className="flex space-x-3">
                <input
                    type="text"
                    placeholder={isListening ? "Listening... Speak now." : "Search by voice or text..."}
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-gray-700"
                    disabled={isListening}
                />

                <motion.button
                    type="button"
                    onClick={toggleListening}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                        isListening ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={isListening ? "Stop Listening" : "Start Voice Search"}
                >
                    <IconMic className="w-6 h-6" />
                </motion.button>

                <motion.button
                    type="submit"
                    className="p-3 rounded-xl bg-slate-600 text-white hover:bg-slate-700 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!transcript.trim() || isListening}
                    title="Submit Search"
                >
                    <IconSend className="w-6 h-6" />
                </motion.button>
            </form>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 font-medium ml-2"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
