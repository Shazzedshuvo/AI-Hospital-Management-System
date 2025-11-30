"use client";

// ইমপোর্ট ঠিক করা হলো: 'motion/react' এর পরিবর্তে 'framer-motion'
import { motion } from "framer-motion";
import { FiMessageCircle, FiCheckCircle, FiUploadCloud, FiClock } from "react-icons/fi";
import Link from "next/link"; // Assuming Link might be useful for buttons

export default function AIHealthAssistantSection() {
  return (
    <div className="px-4 py-16 md:py-24 bg-white"> {/* Background changed to white for clean contrast */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* --- Content/Text Section (Left on Desktop) --- */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <FiMessageCircle className="text-5xl text-blue-600 mb-4 mx-auto md:mx-0" />
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            Meet Your <span className="text-blue-600">Smart AI</span> Health Assistant
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-lg md:max-w-none">
            Ask questions, upload symptoms, or receive personalized medical insights instantly. Your smart AI health companion is always ready.
          </p>

          {/* Feature List */}
          <ul className="space-y-4 text-left">
            <motion.li 
              initial={{ opacity: 0, x: -10 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-start text-slate-800"
            >
              <FiCheckCircle className="flex-shrink-0 mt-1 mr-3 text-blue-500 text-xl" />
              <span>**Instant Symptom Analysis:** Get immediate, AI-powered preliminary assessments.</span>
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -10 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-start text-slate-800"
            >
              <FiUploadCloud className="flex-shrink-0 mt-1 mr-3 text-blue-500 text-xl" />
              <span>**Secure Report Upload:** Upload test results for quick, data-driven insights.</span>
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -10 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-start text-slate-800"
            >
              <FiClock className="flex-shrink-0 mt-1 mr-3 text-blue-500 text-xl" />
              <span>**24/7 Availability:** Access reliable health information anytime, anywhere.</span>
            </motion.li>
          </ul>
          
          {/* Buttons */}
          <div className="flex justify-center md:justify-start gap-4 mt-10">
            {/* Primary Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-blue-500/50 hover:bg-blue-700 transition-all duration-300"
            >
              Start AI Chat
            </motion.button>
            
            {/* Secondary Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="border-2 border-slate-300 text-slate-800 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300"
            >
              <Link href="/learn-ai-assistant">Learn More</Link>
            </motion.button>
          </div>
        </motion.div>
        

        {/* --- Image Section (Right on Desktop) --- */}
        <motion.div
          className="w-full md:w-1/2 rounded-3xl shadow-2xl overflow-hidden order-1 md:order-2 group relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <img
            // আপনার দেওয়া ইমেজ লিঙ্ক
            src="https://img.freepik.com/premium-photo/ai-powered-electronic-health-assistants-solid-color-background_964851-7839.jpg"
            alt="AI Health Assistant"
            className="w-full h-96 md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-blue-900/10 transition-opacity duration-300 group-hover:bg-blue-900/20"></div>
        </motion.div>

      </div>
    </div>
  );
}