"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TypeScript Interfaces ---
interface Hospital {
    id: number;
    name: string;
    address: string;
    rating: number;
    specialties: string[];
    distance: number;
    isPremium: boolean;
    imageUrl: string;
    phone: string;
}

interface HospitalCardProps {
    hospital: Hospital;
    onClick: () => void;
    onCall: (phone: string) => void;
}

// --- Icon components (Inline SVGs with TypeScript types) ---
type IconProps = React.SVGProps<SVGSVGElement>;

const IconSearch = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const IconMapPin = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
);
const IconStar = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);
const IconHeart = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A7 7 0 0 0 15.5 3L12 6.5 8.5 3A7 7 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);
const IconUsers = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);
const IconPhone = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-8.2-8.2A19.79 19.79 0 0 1 2 4.18V2.82c0-1.1.9-2 2-2 1.45 0 2.8.31 4.1.91l.83.47a2 2 0 0 1 1 1.76v3.29a2 2 0 0 1-.6 1.35l-1.92 1.92a15.7 15.7 0 0 0 6.27 6.27l1.92-1.92a2 2 0 0 1 1.35-.6h3.29c.88 0 1.62.42 2.18 1.15z"/>
    </svg>
);
// ------------------------------------------------

// --- Hospital Data Definition ---

const getPlaceholderUrl = (id: number): string => {
    // Image type: 1=Building/Banner, 2=Team/Staff, 3=Equipment
    const type = id % 3;
    let text, color, size;

    if (type === 1) { // Building
        text = "Modern+Hospital";
        color = "4F46E5/FFFFFF"; // Indigo
        size = "400x200";
    } else if (type === 2) { // Team
        text = "Expert+Doctors+Team";
        color = "059669/FFFFFF"; // Emerald
        size = "400x200";
    } else { // Equipment
        text = "Advanced+Care";
        color = "FBBF24/000000"; // Amber
        size = "400x200";
    }
    return `https://placehold.co/${size}/${color}?text=${text}`;
};

const hospitalData: Hospital[] = [
    {
        id: 1,
        name: "Apollo Hospitals Dhaka",
        address: "Baridhara, Dhaka",
        rating: 4.8,
        specialties: ["Cardiology", "Neurosurgery", "Gastroenterology"],
        distance: 5.2,
        isPremium: true,
        imageUrl: getPlaceholderUrl(1),
        phone: "017xxxxxxx1"
    },
    {
        id: 2,
        name: "United Hospital Limited",
        address: "Gulshan, Dhaka",
        rating: 4.6,
        specialties: ["Orthopedics", "Dermatology", "Pediatrics"],
        distance: 8.9,
        isPremium: true,
        imageUrl: getPlaceholderUrl(2),
        phone: "017xxxxxxx2"
    },
    {
        id: 3,
        name: "Square Hospitals",
        address: "Panthapath, Dhaka",
        rating: 4.9,
        specialties: ["Critical Care", "Nephrology", "Oncology"],
        distance: 1.5,
        isPremium: true,
        imageUrl: getPlaceholderUrl(3),
        phone: "017xxxxxxx3"
    },
    {
        id: 4,
        name: "Evercare Hospital",
        address: "Bashundhara, Dhaka",
        rating: 4.5,
        specialties: ["General Surgery", "Dentistry"],
        distance: 12.0,
        isPremium: false,
        imageUrl: getPlaceholderUrl(4),
        phone: "017xxxxxxx4"
    },
    {
        id: 5,
        name: "Popular Diagnostic Center",
        address: "Dhanmondi, Dhaka",
        rating: 4.2,
        specialties: ["Diagnostic", "Imaging"],
        distance: 3.1,
        isPremium: false,
        imageUrl: getPlaceholderUrl(5),
        phone: "017xxxxxxx5"
    },
    {
        id: 6,
        name: "Dhaka Medical College Hospital",
        address: "Bokshibazar, Dhaka",
        rating: 4.0,
        specialties: ["Emergency Services", "General Medicine"],
        distance: 2.5,
        isPremium: false,
        imageUrl: getPlaceholderUrl(6),
        phone: "017xxxxxxx6"
    },
];

const allSpecialties = ['All', ...new Set(hospitalData.flatMap(h => h.specialties))].sort();

// --- Hospital Card Component ---

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onClick, onCall }) => {
    // Cleaner color palette choices
    const accentColor = hospital.isPremium ? 'text-indigo-600' : 'text-slate-600';
    const accentBg = hospital.isPremium ? 'bg-indigo-50' : 'bg-slate-100';
    
    // Primary button style is cleaner (no harsh gradient/shadow)
    const buttonClass = hospital.isPremium 
        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
        : 'bg-slate-600 text-white hover:bg-slate-700';

    return (
        <motion.div
            // Reduced shadow and sharper corners for a cleaner look
            className="bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 cursor-pointer"
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
            whileTap={{ scale: 0.99 }}
        >
            {/* Hospital Image Banner */}
            <div className="relative h-40">
                <img
                    src={hospital.imageUrl}
                    alt={hospital.name}
                    className="w-full h-full object-cover rounded-t-xl"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                        (e.target as HTMLImageElement).onerror = null; 
                        (e.target as HTMLImageElement).src = "https://placehold.co/400x200/CCCCCC/000000?text=No+Image"; 
                    }}
                />
                {hospital.isPremium && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center shadow-md">
                        <IconHeart className="w-3 h-3 mr-1 fill-current"/> Premium Care
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-5" onClick={onClick}>
                {/* Name & Rating */}
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 leading-snug pr-2">{hospital.name}</h3>
                    <div className="flex items-center text-md font-semibold text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded-full">
                        <IconStar className="w-4 h-4 fill-current"/>
                        <span className="ml-1">{hospital.rating}</span>
                    </div>
                </div>

                {/* Address & Distance */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <IconMapPin className={`w-4 h-4 mr-2 ${accentColor}`} />
                    <span className="truncate">{hospital.address} • <span className="font-medium text-gray-700">{hospital.distance} km</span></span>
                </div>

                {/* Specialties Tags - Made smaller and lighter */}
                <div className="flex flex-wrap gap-2 mb-4 pt-2 border-t border-gray-100">
                    {hospital.specialties.slice(0, 3).map((spec, index) => (
                        <span key={index} className={`text-xs font-medium px-2.5 py-0.5 rounded-lg bg-gray-50 text-gray-500 border border-gray-200`}>
                            {spec}
                        </span>
                    ))}
                    {hospital.specialties.length > 3 && (
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-lg bg-gray-50 text-gray-400">
                            +{hospital.specialties.length - 3} More
                        </span>
                    )}
                </div>
            </div>

            {/* Call to Action Buttons - Simplified */}
            <div className="flex p-5 pt-0 gap-3">
                <motion.button
                    onClick={(e) => { e.stopPropagation(); onCall(hospital.phone); }}
                    className="flex-shrink-0 p-3 rounded-xl border border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Call Now"
                >
                    <IconPhone className="w-5 h-5" />
                </motion.button>
                <motion.button
                    onClick={(e) => { e.stopPropagation(); onClick(); }}
                    className={`flex-grow py-3 rounded-xl font-semibold transition-colors duration-200 ${buttonClass}`}
                    whileHover={{ opacity: 0.9 }}
                    whileTap={{ scale: 0.98 }}
                    title="View Details"
                >
                    View Details
                </motion.button>
            </div>
        </motion.div>
    );
};

// --- Main Application Component ---

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('All');
    const [message, setMessage] = useState('');

    // Filtering Logic
    const filteredHospitals = useMemo(() => {
        return hospitalData
            .filter(hospital => {
                // 1. Specialty Filter
                const matchesSpecialty = selectedSpecialty === 'All' || hospital.specialties.includes(selectedSpecialty);

                // 2. Search Term Filter (Name or Address)
                const lowerCaseSearch = searchTerm.toLowerCase();
                const matchesSearch = 
                    hospital.name.toLowerCase().includes(lowerCaseSearch) ||
                    hospital.address.toLowerCase().includes(lowerCaseSearch) ||
                    hospital.specialties.some(s => s.toLowerCase().includes(lowerCaseSearch));

                return matchesSpecialty && matchesSearch;
            })
            .sort((a, b) => b.isPremium as unknown as number - (a.isPremium as unknown as number) || b.rating - a.rating); // Premium hospitals displayed first, then by rating

    }, [searchTerm, selectedSpecialty]);

    // Custom Message Handler (replaces alert())
    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleCardClick = (hospitalName: string) => {
        showMessage(`Navigating to the details page for "${hospitalName}".`);
    };

    const handleCallClick = (phoneNumber: string) => {
        showMessage(`Calling: ${phoneNumber} (Demo only, actual call functionality is not implemented)`);
    };


    return (
        // Changed overall background to a softer gray-100
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
            <header className="text-center mb-10">
                {/* Header text made slightly subtler */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                    <IconHeart className="w-7 h-7 inline-block fill-current text-red-500 mr-2"/>
                    Find Your <span className="text-indigo-600">Ideal Care</span>
                </h1>
                <p className="text-md text-gray-500 mt-2">Browse trusted healthcare providers near you.</p>
            </header>

            {/* Message/Alert Box */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        className="fixed top-4 left-1/2 -translate-x-1/2 bg-white text-center p-4 rounded-lg shadow-xl z-50 border-t-4 border-indigo-500 max-w-sm w-full"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <p className="text-indigo-700 font-semibold">{message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Filtering and Search Controls - Unified and Cleaned --- */}
            <div className="max-w-6xl mx-auto mb-10 space-y-5 p-5 bg-white rounded-xl shadow-xl">
                
                {/* Search Bar - Made simpler with rounded-full look */}
                <div className="relative">
                    <IconSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by hospital name, address, or specialty..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-12 border border-gray-200 rounded-full focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-gray-700 text-base"
                    />
                </div>

                {/* Category Filters - More compact and subtle */}
                <div className="flex flex-wrap gap-2 pt-2 items-center overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 border-t border-gray-100 mt-4">
                    <IconUsers className="text-gray-500 flex-shrink-0 mr-3 w-5 h-5" />
                    {allSpecialties.map(spec => (
                        <motion.button
                            key={spec}
                            onClick={() => setSelectedSpecialty(spec)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0
                                ${selectedSpecialty === spec 
                                    ? 'bg-indigo-500 text-white shadow-md' 
                                    : 'bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {spec === 'All' ? 'All Specialties' : spec}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* --- Hospital Cards Grid --- */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xl font-semibold text-slate-700 mb-6 ml-2">
                    {filteredHospitals.length} {filteredHospitals.length === 1 ? 'Hospital' : 'Hospitals'} Found
                </h2>
                
                {filteredHospitals.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredHospitals.map(hospital => (
                            <motion.div
                                key={hospital.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <HospitalCard 
                                    hospital={hospital} 
                                    onClick={() => handleCardClick(hospital.name)}
                                    onCall={handleCallClick}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-gray-200 mt-8">
                        <p className="text-xl text-gray-500">
                            Sorry, no hospitals match your search criteria. Try different keywords or filters.
                        </p>
                    </div>
                )}
            </div>
            
            <footer className="mt-16 text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Hospital Finder Demo. All rights reserved.</p>
            </footer>
        </div>
    );
}