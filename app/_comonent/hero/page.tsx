"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHeart, FiCalendar, FiCpu, FiActivity, FiAlertCircle, FiPackage } from "react-icons/fi";

// --- Basic component structures for demonstration (Replace with your actual imports) ---
const BentoGrid = ({ children, className }) => (
    <div className={`grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {children}
    </div>
);

const BentoGridItem = ({ title, description, header, icon, className }) => (
    <motion.div
        className={`flex flex-col space-y-2 p-6 rounded-3xl border border-gray-200 bg-white shadow-lg transition duration-300 h-full ${className}`}
        whileHover={{ boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.2)", y: -5 }} // Blue shadow on hover
        transition={{ type: "spring", stiffness: 300 }}
    >
        {header}
        <div className="flex items-center space-x-3">
            <div className="text-blue-600 text-3xl flex-shrink-0">
                {icon}
            </div>
            <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-700 transition duration-200">
                {title}
            </h3>
        </div>
        <p className="text-sm text-gray-500 font-normal">
            {description}
        </p>
    </motion.div>
);
// --- End of basic component structures ---

// **আপনার দেওয়া আসল ইমেজ লিঙ্কগুলো এখানে ব্যবহার করা হয়েছে**
const features = [
  {
    title: "Hospitals",
    description: "Find nearby hospitals and check available facilities instantly.",
    image: "https://wallpaperbat.com/img/8611840-medicine-4k-wallpaper.jpg",
    icon: <FiHeart />,
    href: "/hospitals",
    className: "md:col-span-2",
  },
  {
    title: "Doctor Booking",
    description: "Browse specialists and book appointments with ease.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/031/610/125/small_2x/a-young-male-doctor-clicking-on-an-image-while-other-medical-icons-are-displayed-medical-stock-images-ai-generative-photo.jpg",
    icon: <FiCalendar />,
    href: "/doctors",
  },
  {
    title: "AI Health Assistant",
    description: "Ask symptoms, get instant answers using AI-powered medical assistant.",
    image: "https://img.freepik.com/premium-photo/ai-powered-electronic-health-assistants-solid-color-background_964851-7839.jpg",
    icon: <FiCpu />,
    href: "/ai-assistant",
  },
  {
    title: "Diagnostics",
    description: "Upload reports to receive AI-analyzed medical insights.",
    image: "https://tse3.mm.bing.net/th/id/OIP.UctyyeQoqN9QQyzpzM250gHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: <FiActivity />,
    href: "/diagnostics",
    className: "md:col-span-2",
  },
  {
    title: "Emergency Care",
    description: "Get directions to the nearest emergency center instantly.",
    image: "https://static.vecteezy.com/system/resources/previews/021/529/558/non_2x/emergency-medical-services-concept-doctor-holding-in-hand-the-emergency-symbol-online-medical-support-first-aid-medicine-and-healthcare-application-illustration-vector.jpg",
    icon: <FiAlertCircle />,
    href: "/emergency",
  },
  {
    title: "Medicines",
    description: "Order safe and verified medicines from trusted pharmacies.",
    image: "https://wallpaperbat.com/img/9730796-how-artificial-intelligence-is.jpg",
    icon: <FiPackage />,
    href: "/medicines",
  },
];

export default function MedicalBentoSection() {
  return (
    <section className="px-4 py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Smart Healthcare Services 💡
        </h2>
        <p className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Explore the core features designed to simplify your medical journey from diagnosis to treatment.
        </p>

        {/* Bento Grid Container */}
        <BentoGrid>
          {features.map((feature, index) => (
            <Link 
              key={index} 
              href={feature.href} 
              className={`group block h-full ${feature.className || ''}`}
            >
              <BentoGridItem
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className={index === 0 ? "lg:col-span-2" : ""} 
                header={
                  <div className="relative overflow-hidden rounded-2xl mb-4 h-40">
                    <img
                      src={feature.image} // <--- আপনার দেওয়া লিঙ্ক
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: 'brightness(0.8)' }} 
                    />
                    {/* Dark Blue Overlay */}
                    <div className="absolute inset-0 bg-blue-900/10 transition-opacity duration-300 group-hover:bg-blue-900/30"></div>
                  </div>
                }
              />
            </Link>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}