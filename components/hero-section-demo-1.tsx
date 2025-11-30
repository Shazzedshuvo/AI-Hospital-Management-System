"use client";

// ইমপোর্ট ঠিক করা হলো: 'motion/react' এর পরিবর্তে 'framer-motion'
import { motion } from "framer-motion"; 
import { FaStethoscope } from "react-icons/fa";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";



// --- NAVBAR Component ---
const Navbar = () => {
    const navLinks = [
      { name: "Hospitals", href: "/hospitals" },
      { name: "Doctors", href: "/doctors" },
      { name: "AI Assistant", href: "/ai-assistant" },
      { name: "Diagnostics", href: "/diagnostics" },
      { name: "Contact", href: "/contact" },
    ];

    const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

    return (
      <nav className="flex w-full items-center justify-between px-4 py-4 md:px-8 border-b border-sky-100 bg-white shadow-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <FaStethoscope className="text-3xl text-blue-600 group-hover:text-blue-700 transition duration-300" />
          <h1 className="text-xl font-bold text-slate-900">MedAI Hub</h1>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;

            return (
              <li key={link.name} className="group">
                <Link
                  href={link.href}
                  className="relative pb-1 text-slate-700 hover:text-blue-700 transition-colors duration-300 font-medium"
                >
                  {link.name}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] w-full bg-blue-600 transition-transform duration-300
                    ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/login"
          className="w-28 transform rounded-full bg-blue-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:bg-blue-700 text-center shadow-md"
        >
          Login
        </Link>
      </nav>
    );
};




// --- HERO SECTION Component ---
export default function HeroSectionOne() {
    const paragraphDelay = 0.8;
    const buttonDelay = 1.1;
    const imageDelay = 1.4;

    return (
      <div className="relative flex flex-col items-center justify-center bg-white min-h-screen">
        <Navbar />

        {/* Subtle Background Grid/Lines */}
        <div className="absolute inset-0 z-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E0F2F7" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
        
        {/* Content Area */}
        <div className="px-4 py-16 md:py-24 relative z-10 w-full max-w-7xl">
          <h1 className="relative z-10 mx-auto max-w-6xl text-center text-3xl font-extrabold text-slate-900 md:text-5xl lg:text-7xl leading-tight">
            {/* FIX APPLIED: সম্পূর্ণ অ্যানিমেশন লজিকটি এখন একটি সিঙ্গেল {} এর মধ্যে আছে */}
            {
              "Smart AI Healthcare for Every Patient"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.07,
                      ease: "easeOut",
                    }}
                    className={`mr-3 inline-block ${
                      word === "Smart" || word === "AI" || word === "Healthcare" 
                      ? "text-blue-600" : "text-slate-900"
                    }`} 
                  >
                    {word}
                  </motion.span>
                ))
            }
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: paragraphDelay }}
            className="relative z-10 mx-auto max-w-2xl py-6 text-center text-xl text-slate-600"
          >
            AI-powered medical assistant for hospitals, diagnostics, and instant
            doctor booking. Healthcare becomes smarter with AI.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: buttonDelay }}
            className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-5"
          >
            <button className="w-full sm:w-64 transform rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-blue-700 shadow-lg shadow-blue-500/50">
              Start AI Health Check
            </button>

            <button className="w-full sm:w-64 transform rounded-full border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-800 transition-all duration-300 hover:scale-[1.03] hover:bg-slate-100 shadow-md">
              Book a Doctor
            </button>
          </motion.div>

          
<div className=" mt-10 w-full"></div>
          {/* Image Section - আপনার আসল ইমেজ লিঙ্ক অক্ষত রাখা হয়েছে */}
          <motion.div
            className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl group mt-16 border-4 border-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: imageDelay }}
          >
            {/* Image Container */}
            <div className="relative w-full overflow-hidden rounded-3xl">
              <img
                src="https://static.vecteezy.com/system/resources/previews/026/994/236/non_2x/human-body-low-poly-wireframe-futuristic-scan-set-human-hologram-body-x-ray-3d-model-in-hud-style-ai-generative-free-photo.jpg"
                alt="Medical AI preview"
                className="w-full h-96 md:h-[550px] lg:h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100 transition-opacity duration-500 group-hover:from-black/80 rounded-3xl"></div>

              {/* Icon and Text */}
              <div className="absolute bottom-8 left-8 flex flex-col md:flex-row items-start md:items-center gap-5 text-white">
                <motion.div
                  className="text-5xl md:text-6xl text-blue-400"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: imageDelay + 0.8 }}
                >
                  <FiHeart />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: imageDelay + 0.4, duration: 0.6 }}
                >
                  <h3 className="text-3xl md:text-4xl font-extrabold">AI Health Assistant</h3>
                  <p className="text-md md:text-lg opacity-90 max-w-lg mt-1">
                    Get instant medical insights and personalized advice with our AI-powered assistant.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
      </div>

      
    );
}