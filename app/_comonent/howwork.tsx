"use client";

import { motion } from "framer-motion";
import { FiSearch, FiCpu, FiCalendar, FiPackage, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";

// Step Data with href and detailed list for hover/click action
const steps = [
  {
    title: "Search Symptoms / Upload Reports",
    description: "Tell us your symptoms or upload medical reports for AI analysis.",
    icon: <FiSearch />,
    color: "text-teal-500",
    href: "#symptoms-details",
    details: [
      "Input symptoms directly via text.",
      "Securely upload medical test results and images.",
      "Data is preprocessed for initial AI screening.",
    ]
  },
  {
    title: "Get AI Analysis / Doctor Suggestion",
    description: "Receive instant AI-powered insights and doctor recommendations.",
    icon: <FiCpu />,
    color: "text-blue-500",
    href: "#ai-analysis-details",
    details: [
      "Receive a preliminary AI-driven health summary.",
      "Get matched with the most relevant specialists.",
      "Review the recommended next steps and potential diagnoses.",
    ]
  },
  {
    title: "Book Appointment / Get Medicine",
    description: "Schedule appointments or order verified medicines quickly.",
    icon: <FiCalendar />,
    color: "text-indigo-500",
    href: "#booking-details",
    details: [
      "Check real-time availability of suggested doctors.",
      "Book in-person or virtual appointments instantly.",
      "Order verified prescriptions delivered to your home.",
    ]
  },
  {
    title: "Track & Monitor Health",
    description: "Keep track of your health records and progress with AI assistance.",
    icon: <FiPackage />,
    color: "text-purple-500",
    href: "#tracking-details",
    details: [
      "Access a secure, chronological record of all your health data.",
      "Receive timely reminders for check-ups and medications.",
      "Monitor progress using personalized AI insights and reports.",
    ]
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HowItWorksSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


    return (
        <section className="px-4 py-16 sm:py-24 bg-white">
            <div className="max-w-4xl mx-auto">
                {/* Title Section */}
                <motion.h2 
                    className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-4 tracking-tight"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Our Simple 4-Step Process 🩺
                </motion.h2>
                <motion.p
                    className="text-xl text-center text-gray-500 mb-16 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Hover over any step to see a detailed breakdown of our workflow.
                </motion.p>
                
                {/* Vertical Steps Container */}
                <motion.div
                    className="relative pt-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Main Vertical Line */}
                    <div className="absolute left-10 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-blue-200" />

                    {steps.map((step, index) => (
                        <motion.a
                            key={index}
                            href={step.href} // Link remains for navigation
                            variants={itemVariants}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative flex items-start md:items-center w-full my-8 first:mt-0 last:mb-0 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            {/* Step Indicator (Circle) */}
                            <div className="flex-shrink-0 relative w-20 h-20 flex items-center justify-center z-10 
                                md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                                    bg-white border-4 ${step.color.replace('text-', 'border-')} 
                                    group-hover:w-12 group-hover:h-12 transition-all duration-300 shadow-md`}>
                                    <span className={`text-lg font-bold ${step.color}`}>
                                        {index + 1}
                                    </span>
                                </div>
                            </div>

                            {/* Content Card (Left on mobile, Alternating on desktop) */}
                            <motion.div
                                className={`flex flex-col p-6 rounded-xl shadow-lg bg-white border-l-4 
                                    ${step.color.replace('text-', 'border-')} w-full md:w-[45%] 
                                    ${index % 2 === 0 ? 'md:mr-auto md:border-r-0 md:border-l-4' : 'md:ml-auto md:border-l-0 md:border-r-4'}`}
                                
                                whileHover={{ scale: 1.02 }}
                            >
                                {/* Title and Description */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2 mt-0 flex items-center">
                                    <span className={`md:hidden mr-2 ${step.color} text-2xl`}>{step.icon}</span> 
                                    {step.title}
                                </h3>
                                <p className="text-base text-gray-600">{step.description}</p>
                                
                                {/* Hover Details (Dynamically appears) */}
                                <motion.div
                                    initial={false}
                                    animate={hoveredIndex === index ? "open" : "closed"}
                                    variants={{
                                        open: { height: "auto", opacity: 1, marginTop: "1rem" },
                                        closed: { height: 0, opacity: 0, marginTop: "0rem" },
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <ul className="space-y-2 pt-2">
                                        {step.details.map((detail, detailIndex) => (
                                            <motion.li 
                                                key={detailIndex} 
                                                className="flex items-start text-sm text-gray-700"
                                            >
                                                <FiCheckCircle className={`flex-shrink-0 mt-1 mr-2 ${step.color}`} />
                                                <span>{detail}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Link Indicator */}
                                <div className="flex items-center text-blue-600 mt-4 text-sm font-semibold">
                                    Go to Details 
                                    <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </motion.div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}