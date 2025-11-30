"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Icon components replacing react-icons to fix compilation errors ---
const IconStar = (props) => (
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

const IconClock = (props) => (
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

const IconDollarSign = (props) => (
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

const IconZap = (props) => (
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

const IconCalendar = (props) => (
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

const IconUser = (props) => (
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

const IconSearch = (props) => (
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

const IconFilter = (props) => (
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
// ------------------------------------------------

// --- 1. DATA DEFINITIONS (Adapted from doctorsData.ts) ---

// Helper function to create safe placeholder URLs
const getPlaceholderUrl = (id) =>
  `https://placehold.co/100x100/A0E7E5/000000?text=Dr+${id}`;

const doctorsData = [
  // --- 5 Free Doctors ---
  {
    id: 1,
    name: "Dr. Ahasan Habib",
    specialty: "Family Medicine Expert",
    category: "General Physician",
    isPremium: false,
    rating: 4.8,
    experience: 12,
    fee: 0,
    bio: "Expert in treating general health issues and chronic diseases. Available for quick consultation.",
    imageUrl: getPlaceholderUrl(1),
  },
  {
    id: 2,
    name: "Dr. Nazmul Hasan",
    specialty: "Dental Surgeon",
    category: "Dentist",
    isPremium: false,
    rating: 4.5,
    experience: 8,
    fee: 0,
    bio: "Specializes in routine check-ups and basic dental procedures.",
    imageUrl: getPlaceholderUrl(2),
  },
  {
    id: 3,
    name: "Dr. Sadia Afrin",
    specialty: "Child Specialist",
    category: "Pediatrician",
    isPremium: false,
    rating: 4.9,
    experience: 15,
    fee: 0,
    bio: "Dedicated to the health and well-being of children from infancy through adolescence.",
    imageUrl: getPlaceholderUrl(3),
  },
  {
    id: 4,
    name: "Dr. Tarek Islam",
    specialty: "General Practitioner",
    category: "General Physician",
    isPremium: false,
    rating: 4.0,
    experience: 5,
    fee: 0,
    bio: "Offers primary care services for common illnesses and minor injuries.",
    imageUrl: getPlaceholderUrl(4),
  },
  {
    id: 5,
    name: "Dr. Fahmida Khan",
    specialty: "Nerve Specialist (Junior)",
    category: "Neurologist",
    isPremium: false,
    rating: 4.2,
    experience: 6,
    fee: 0,
    bio: "Focuses on common neurological issues like headaches and minor nerve pains.",
    imageUrl: getPlaceholderUrl(5),
  },

  // --- 10 Premium Doctors ---
  {
    id: 6,
    name: "Prof. Dr. Shakil Ahmed",
    specialty: "Senior Cardiologist",
    category: "Cardiologist",
    isPremium: true,
    rating: 5.0,
    experience: 25,
    fee: 1500,
    bio: "One of the top cardiologists, specializing in complex cardiac interventions and bypass surgery.",
    imageUrl: getPlaceholderUrl(6),
  },
  {
    id: 7,
    name: "Dr. Rasheda Begum",
    specialty: "Advanced Neurologist",
    category: "Neurologist",
    isPremium: true,
    rating: 4.7,
    experience: 18,
    fee: 1200,
    bio: "Highly experienced in treating complex brain and nervous system disorders, including stroke and epilepsy.",
    imageUrl: getPlaceholderUrl(7),
  },
  {
    id: 8,
    name: "Dr. Alomgir Hossain",
    specialty: "Pediatric Consultant",
    category: "Pediatrician",
    isPremium: true,
    rating: 4.9,
    experience: 20,
    fee: 1000,
    bio: "A leading consultant in pediatric critical care and immunization.",
    imageUrl: getPlaceholderUrl(8),
  },
  {
    id: 9,
    name: "Dr. Taslima Akter",
    specialty: "Aesthetic Dentistry",
    category: "Dentist",
    isPremium: true,
    rating: 4.6,
    experience: 10,
    fee: 800,
    bio: "Expert in cosmetic dentistry, veneers, and root canal treatment.",
    imageUrl: getPlaceholderUrl(9),
  },
  {
    id: 10,
    name: "Dr. Kamal Pasha",
    specialty: "Gastroenterologist",
    category: "General Physician",
    isPremium: true,
    rating: 4.5,
    experience: 14,
    fee: 1100,
    bio: "Specializing in digestive system disorders and advanced endoscopy.",
    imageUrl: getPlaceholderUrl(10),
  },
  {
    id: 11,
    name: "Dr. Zarin Rahman",
    specialty: "Vascular Surgeon",
    category: "Cardiologist",
    isPremium: true,
    rating: 4.8,
    experience: 22,
    fee: 1600,
    bio: "Expert in vascular health, treating diseases of the arteries and veins.",
    imageUrl: getPlaceholderUrl(11),
  },
  {
    id: 12,
    name: "Dr. Emon Chowdhury",
    specialty: "Child Psychiatrist",
    category: "Pediatrician",
    isPremium: true,
    rating: 4.7,
    experience: 16,
    fee: 900,
    bio: "Provides specialized mental health care for children and adolescents.",
    imageUrl: getPlaceholderUrl(12),
  },
  {
    id: 13,
    name: "Dr. Jamil Hossain",
    specialty: "Orthodontist",
    category: "Dentist",
    isPremium: true,
    rating: 4.9,
    experience: 11,
    fee: 1300,
    bio: "Focuses on correcting irregular teeth alignment and bite problems.",
    imageUrl: getPlaceholderUrl(13),
  },
  {
    id: 14,
    name: "Dr. Priti Sen",
    specialty: "Interventional Neurologist",
    category: "Neurologist",
    isPremium: true,
    rating: 4.8,
    experience: 19,
    fee: 1400,
    bio: "Specialized in minimally invasive procedures for brain and spine conditions.",
    imageUrl: getPlaceholderUrl(14),
  },
  {
    id: 15,
    name: "Dr. Kazi Rafi",
    specialty: "Diabetologist",
    category: "General Physician",
    isPremium: true,
    rating: 4.6,
    experience: 13,
    fee: 1000,
    bio: "Manages complex cases of diabetes and endocrinological disorders.",
    imageUrl: getPlaceholderUrl(15),
  },
];

const allCategories = [
  "All",
  "General Physician",
  "Cardiologist",
  "Neurologist",
  "Pediatrician",
  "Dentist",
];

// --- 2. DOCTOR CARD COMPONENT (Adapted and uses SVG Icons) ---

// Placeholder for Image component (since we are in a single .jsx file)
const ImagePlaceholder = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    style={{ objectFit: "cover" }}
    // Fallback for image loading error
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "https://placehold.co/100x100/CCCCCC/000000?text=No+Image";
    }}
  />
);

const DoctorCard = ({ doctor, onClick }) => {
  // 💡 ফিক্স: সমস্ত ডায়নামিক কালার ভেরিয়েবল এখানে সংজ্ঞায়িত করা হলো। (All dynamic color variables defined here)
  const premiumColorHex = "#F59E0B"; // Amber Hex
  const freeColorHex = "#3B82F6"; // Blue Hex
  const greenColorHex = "#10B981"; // Green Hex (for free badge)

  // Tailwind color classes for border
  const baseColor = doctor.isPremium ? "border-amber-500" : "border-blue-500"; // border class

  const accentColor = doctor.isPremium ? premiumColorHex : freeColorHex;

  // Custom Tailwind classes for accent colors
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
      {/* --- 1. Top Section: Image, Name, and Badge --- */}
      <div className="flex justify-center relative -mt-2 mb-3">
        {/* Premium / Free Badge */}
        {doctor.isPremium ? (
          <div className="absolute top-0 right-0 flex items-center text-amber-700 bg-amber-100 px-3 py-1 rounded-bl-xl rounded-tr-xl text-xs font-bold shadow-md">
            <IconZap className="mr-1 w-3 h-3" /> PREMIUM
          </div>
        ) : (
          <div
            className="absolute top-0 right-0 flex items-center px-3 py-1 rounded-bl-xl rounded-tr-xl text-xs font-bold shadow-md"
            style={{
              color: greenColorHex,
              backgroundColor: "rgba(16, 185, 129, 0.1)",
            }} // Custom green for free
          >
            FREE
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        {/* Doctor Image Section */}
        <div
          className={`w-20 h-20 rounded-full overflow-hidden relative border-4 ${baseColor} shadow-md mb-3`}
        >
          {doctor.imageUrl ? (
            <ImagePlaceholder
              src={doctor.imageUrl}
              alt={`Dr. ${doctor.name}`}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-600 text-xl font-bold">
              {doctor.name[0]}
            </div>
          )}
        </div>

        {/* Name and Specialty */}
        <h3 className="text-xl font-extrabold text-slate-800 line-clamp-1 text-center px-2">
          {doctor.name}
        </h3>
        <p
          className={`text-sm ${accentText} font-medium line-clamp-1 mb-2 text-center`}
        >
          {doctor.specialty}
        </p>
      </div>

      {/* --- 2. Middle Section: Bio/Description and Category --- */}
      <div className="pt-2 border-t border-gray-100">
        <p className="text-sm text-slate-600 line-clamp-2 italic mb-3 h-10 overflow-hidden">
          {doctor.bio ||
            "Expert consultant providing comprehensive care in the medical field."}
        </p>
        <div className="flex items-center text-xs text-slate-500 font-semibold p-1.5 rounded-lg border border-gray-200 bg-gray-50 justify-center">
          <IconUser
            className={`mr-1.5 w-4 h-4`}
            style={{ color: accentColor }}
          />
          {doctor.category}
        </div>
      </div>

      {/* --- 3. Details Block (Rating, Experience, Fee) --- */}
      <div className="grid grid-cols-3 gap-3 pt-4 pb-4">
        {/* Rating */}
        <div
          className={`flex flex-col items-center text-sm text-slate-700 p-2 ${accentBg} rounded-lg`}
        >
          <IconStar className="text-yellow-500 w-5 h-5 mb-0.5" />
          <span className="font-bold">{doctor.rating}</span>
          <span className="text-xs text-slate-500">Rating</span>
        </div>

        {/* Experience */}
        <div
          className={`flex flex-col items-center text-sm text-slate-700 p-2 ${accentBg} rounded-lg`}
        >
          <IconClock className="text-blue-500 w-5 h-5 mb-0.5" />
          <span className="font-bold">{doctor.experience}Y+</span>
          <span className="text-xs text-slate-500">Exp.</span>
        </div>

        {/* Fee */}
        <div
          className={`flex flex-col items-center text-sm text-slate-700 p-2 ${accentBg} rounded-lg`}
        >
          <IconDollarSign className="text-green-500 w-5 h-5 mb-0.5" />
          <span className="font-bold">
            {doctor.fee === 0 ? "Free" : `৳${doctor.fee}`}
          </span>
          <span className="text-xs text-slate-500">Fee</span>
        </div>
      </div>

      {/* --- 4. Bottom Section: Call to Action --- */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          // Alert replaced with custom message handling in the main component
          onClick();
        }}
        className="w-full py-3 rounded-xl flex items-center justify-center text-white font-semibold transition-colors duration-200 shadow-lg text-lg mt-3"
        style={{
          backgroundColor: accentColor,
        }}
        whileHover={{ scale: 1.01, boxShadow: buttonHoverShadow }}
        whileTap={{ scale: 0.99 }}
      >
        <IconCalendar className="mr-2 w-6 h-6" />
        {doctor.isPremium ? "Book Appointment" : "Consult Free Now"}
      </motion.button>
    </motion.div>
  );
};

// --- 3. MAIN APPLICATION COMPONENT ---

export default function App() {
  // 💡 ফিক্স: সার্চ টার্ম এবং ক্যাটাগরি স্টেট (Search term and category state)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 💡 ফিক্স: মেসেজ বক্সের জন্য স্টেট (State for the message box)
  const [message, setMessage] = useState("");

  // Filtered list of doctors based on search term and category
  const filteredDoctors = useMemo(() => {
    return doctorsData.filter((doctor) => {
      // 1. Category Filter
      const matchesCategory =
        selectedCategory === "All" || doctor.category === selectedCategory;

      // 2. Search Term Filter (Name, Specialty, or Bio)
      const lowerCaseSearch = searchTerm.toLowerCase();
      const matchesSearch =
        doctor.name.toLowerCase().includes(lowerCaseSearch) ||
        doctor.specialty.toLowerCase().includes(lowerCaseSearch) ||
        doctor.bio.toLowerCase().includes(lowerCaseSearch);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCardClick = (doctorName) => {
    setMessage(
      `Doctor ${doctorName} selected. This would navigate to a detailed view.`
    );
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 tracking-tight">
          Find Your <span className="text-amber-500">Doctor</span>
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          Connecting you with expert medical professionals.
        </p>
      </header>

      {/* Message/Alert Box (Replaces alert()) */}
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

      {/* --- Filtering and Search Controls --- */}
      <div className="max-w-6xl mx-auto mb-8 space-y-4 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Search Bar */}
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

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2 items-center">
          <IconFilter className="text-gray-500 mr-1 sm:mr-3 w-5 h-5" />
          {allCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap 
                                ${
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

      {/* --- Doctor Cards Grid --- */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-700 mb-4 ml-2">
          {filteredDoctors.length}{" "}
          {filteredDoctors.length === 1 ? "Doctor" : "Doctors"} Found
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
                  <DoctorCard
                    doctor={doctor}
                    onClick={() => handleCardClick(doctor.name)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-gray-100 mt-8">
            <p className="text-xl text-gray-500">
              No doctors match your search criteria. Try a different category or
              keyword.
            </p>
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p>&copy; 2024 Doctor Listing App Demo. All rights reserved.</p>
      </footer>
    </div>
  );
}
