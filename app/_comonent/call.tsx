"use client";

import { motion } from "framer-motion"; // Framer Motion ইমপোর্ট করা হলো
import { FiArrowRight, FiHeart } from "react-icons/fi"; // আইকন যোগ করা হলো
import Link from "next/link"; // Next.js Link ব্যবহার করা হলো

export default function CTASection() {
  return (
    // Outer Container: হালকা ব্যাকগ্রাউন্ডে কার্ডটি ফ্লোট করবে
    <div className="px-4 py-16 bg-gray-50"> 
        <motion.div
            className="flex flex-col items-center justify-center bg-blue-700 text-white text-center rounded-3xl mx-auto max-w-6xl p-10 md:p-20 shadow-2xl shadow-blue-500/50 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
        >
            {/* --- Background Decorative Elements (Optional) --- */}
            <FiHeart className="absolute top-4 right-4 text-white/10 text-6xl rotate-12" />
            <FiHeart className="absolute bottom-4 left-4 text-white/10 text-8xl -rotate-12" />

            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                Ready for Smarter Healthcare?
            </h2>
            
            <p className="text-xl opacity-90 mb-8 max-w-xl">
                Get instant **AI medical insights** and book your trusted doctor in minutes. Zero waiting time.
            </p>
            
            {/* --- Button --- */}
            <Link href="/ai-assistant">
                <motion.button
                    className="flex items-center bg-white text-blue-700 px-10 py-3 rounded-full font-bold text-lg shadow-lg shadow-white/40 transition-all duration-300 transform"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    Start AI Health Check
                    <FiArrowRight className="ml-2 text-2xl" />
                </motion.button>
            </Link>
        </motion.div>
    </div>
  );
}