"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Icon components replacing react-icons to fix compilation errors ---
const IconStar = (props: React.SVGProps<SVGSVGElement>) => (
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
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconClock = (props: React.SVGProps<SVGSVGElement>) => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconDollarSign = (props: React.SVGProps<SVGSVGElement>) => (
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
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconZap = (props: React.SVGProps<SVGSVGElement>) => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconCalendar = (props: React.SVGProps<SVGSVGElement>) => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconUser = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconFilter = (props: React.SVGProps<SVGSVGElement>) => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// --- TypeScript interfaces ---
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  category: string;
  isPremium: boolean;
  rating: number;
  experience: number;
  fee: number;
  bio: string;
  imageUrl: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onClick: () => void;
}

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  className?: string;
}

// --- Image Placeholder ---
const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    style={{ objectFit: "cover" }}
    onError={(e) => {
      (e.target as HTMLImageElement).src =
        "https://placehold.co/100x100/CCCCCC/000000?text=No+Image";
    }}
  />
);

// --- DoctorCard Component ---
const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  const premiumColorHex = "#F59E0B";
  const freeColorHex = "#3B82F6";
  const greenColorHex = "#10B981";
  const baseColor = doctor.isPremium ? "border-amber-500" : "border-blue-500";
  const accentColor = doctor.isPremium ? premiumColorHex : freeColorHex;
  const accentText = doctor.isPremium ? "text-amber-700" : "text-blue-700";
  const accentBg = doctor.isPremium ? "bg-amber-50" : "bg-blue-50";
  const buttonHoverShadow = doctor.isPremium
    ? "0 4px 10px rgba(245, 158, 11, 0.4)"
    : "0 4px 10px rgba(59, 130, 246, 0.4)";

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-xl p-5 cursor-pointer transition-all duration-300 transform border-2 ${
        doctor.isPremium ? "border-amber-100" : "border-blue-100"
      } overflow-hidden`}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Top Section */}
      <div className="flex justify-center relative -mt-2 mb-3">
        {doctor.isPremium ? (
          <div className="absolute top-0 right-0 flex items-center text-amber-700 bg-amber-100 px-3 py-1 rounded-bl-xl rounded-tr-xl text-xs font-bold shadow-md">
            <IconZap className="mr-1 w-3 h-3" /> PREMIUM
          </div>
        ) : (
          <div
            className="absolute top-0 right-0 flex items-center px-3 py-1 rounded-bl-xl rounded-tr-xl text-xs font-bold shadow-md"
            style={{ color: greenColorHex, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
          >
            FREE
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className={`w-20 h-20 rounded-full overflow-hidden relative border-4 ${baseColor} shadow-md mb-3`}>
          {doctor.imageUrl ? (
            <ImagePlaceholder src={doctor.imageUrl} alt={`Dr. ${doctor.name}`} className="w-full h-full" />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-600 text-xl font-bold">
              {doctor.name[0]}
            </div>
          )}
        </div>

        <h3 className="text-xl font-extrabold text-slate-800 line-clamp-1 text-center px-2">
          {doctor.name}
        </h3>
        <p className={`text-sm ${accentText} font-medium line-clamp-1 mb-2 text-center`}>{doctor.specialty}</p>
      </div>

      {/* Bio */}
      <div className="pt-2 border-t border-gray-100">
        <p className="text-sm text-slate-600 line-clamp-2 italic mb-3 h-10 overflow-hidden">{doctor.bio}</p>
        <div className="flex items-center text-xs text-slate-500 font-semibold p-1.5 rounded-lg border border-gray-200 bg-gray-50 justify-center">
          <IconUser className={`mr-1.5 w-4 h-4`} style={{ color: accentColor }} />
          {doctor.category}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-3 gap-3 pt-4 pb-4">
        <div className={`flex flex-col items-center text-sm text-slate-700 p-2 ${accentBg} rounded-lg`}>
          <IconStar className="text-yellow-500 w-5 h-5 mb-0.5" />
          <span className="font-bold">{doctor.rating}</span>
          <span className="text-xs text-slate-500">Rating</span>
        </div>
        <div className={`flex flex-col items-center text-sm text-slate-700 p-2 ${accentBg} rounded-lg`}>
          <IconClock className="text-blue-500 w-5 h-5 mb-0.5" />
          <span className="font-bold">{doctor.experience}Y+</span>
          <span className="text-xs text-slate-500">Exp.</span>
        </div>
        <div className={`flex flex-col items-center text-sm text-slate-700 p-2 ${accentBg} rounded-lg`}>
          <IconDollarSign className="text-green-500 w-5 h-5 mb-0.5" />
          <span className="font-bold">{doctor.fee === 0 ? "Free" : `৳${doctor.fee}`}</span>
          <span className="text-xs text-slate-500">Fee</span>
        </div>
      </div>

      {/* Button */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="w-full py-3 rounded-xl flex items-center justify-center text-white font-semibold transition-colors duration-200 shadow-lg text-lg mt-3"
        style={{ backgroundColor: accentColor }}
        whileHover={{ scale: 1.01, boxShadow: buttonHoverShadow }}
        whileTap={{ scale: 0.99 }}
      >
        <IconCalendar className="mr-2 w-6 h-6" />
        {doctor.isPremium ? "Book Appointment" : "Consult Free Now"}
      </motion.button>
    </motion.div>
  );
};

// --- Missing Data Definitions (The Fix) ---
const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Eleanor Vance",
    specialty: "Cardiology",
    category: "Heart & Vascular",
    isPremium: true,
    rating: 4.9,
    experience: 15,
    fee: 2500,
    bio: "A leading cardiologist with over a decade of experience in non-invasive cardiac procedures.",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Dr. Marcus Bell",
    specialty: "Pediatrics",
    category: "Children's Health",
    isPremium: false,
    rating: 4.7,
    experience: 8,
    fee: 1200,
    bio: "Dedicated children's specialist focusing on early childhood development and vaccinations.",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Dr. Sofia Reyes",
    specialty: "Dermatology",
    category: "Skin & Hair",
    isPremium: true,
    rating: 4.8,
    experience: 12,
    fee: 2000,
    bio: "Expert in cosmetic and medical dermatology, offering personalized skin treatment plans.",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Dr. Kenji Tanaka",
    specialty: "General Medicine",
    category: "Primary Care",
    isPremium: false,
    rating: 4.5,
    experience: 5,
    fee: 0,
    bio: "Providing comprehensive primary care and preventative health services. Available for free consultations.",
    imageUrl: "https://randomuser.me/api/portraits/men/81.jpg",
  },
  {
    id: 5,
    name: "Dr. Amelia Hart",
    specialty: "Orthopedics",
    category: "Bone & Joint",
    isPremium: true,
    rating: 4.9,
    experience: 20,
    fee: 3000,
    bio: "Specializing in sports injuries and complex joint replacement surgeries.",
    imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
  },
];

const allCategories = [
  "All",
  ...Array.from(new Set(doctorsData.map((d) => d.category))),
];

// --- Main App Component ---
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [message, setMessage] = useState("");

  const filteredDoctors = useMemo(() => {
    return doctorsData.filter((doctor) => {
      const matchesCategory = selectedCategory === "All" || doctor.category === selectedCategory;
      const lowerCaseSearch = searchTerm.toLowerCase();
      const matchesSearch =
        doctor.name.toLowerCase().includes(lowerCaseSearch) ||
        doctor.specialty.toLowerCase().includes(lowerCaseSearch) ||
        doctor.bio.toLowerCase().includes(lowerCaseSearch);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCardClick = (doctorName: string) => {
    setMessage(`Doctor ${doctorName} selected. This would navigate to a detailed view.`);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 tracking-tight">
          Find Your <span className="text-amber-500">Doctor</span>
        </h1>
        <p className="text-lg text-gray-500 mt-2">Connecting you with expert medical professionals.</p>
      </header>

      {/* Message Box */}
      <AnimatePresence>
        {message && (
          <motion.div
            className="fixed top-4 left-1/2 -translate-x-1/2 bg-white text-center p-4 rounded-lg shadow-2xl z-50 border-t-4 border-blue-500 max-w-sm w-full"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <p className="text-blue-700 font-semibold">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search & Filter */}
      <div className="max-w-6xl mx-auto mb-8 space-y-4 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="relative">
          <IconSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, specialty, or bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-12 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-700"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-2 items-center">
          <IconFilter className="text-gray-500 mr-1 sm:mr-3 w-5 h-5" />
          {allCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-700 mb-4 ml-2">
          {filteredDoctors.length} {filteredDoctors.length === 1 ? "Doctor" : "Doctors"} Found
        </h2>

        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <DoctorCard doctor={doctor} onClick={() => handleCardClick(doctor.name)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-gray-100 mt-8">
            <p className="text-xl text-gray-500">No doctors match your search criteria.</p>
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p>&copy; 2024 Doctor Listing App Demo. All rights reserved.</p>
      </footer>
    </div>
  );
}