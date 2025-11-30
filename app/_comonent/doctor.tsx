"use client";

// ইমপোর্ট ঠিক করা হলো: 'motion/react' এর পরিবর্তে 'framer-motion'
import { motion } from "framer-motion";
import { FaStethoscope, FaHospital } from "react-icons/fa";
import Link from "next/link"; // For button links

// --- ডাক্তার ও হাসপাতালের তালিকা ---
const featuredItems = [
  // Doctors
  { name: "Dr. Amy Lee", specialty: "Cardiologist", type: "doctor", rating: 4.9, photo: "https://randomuser.me/api/portraits/women/65.jpg", link: "/doctor/amy-lee" },
  { name: "Dr. Robert Smith", specialty: "Neurologist", type: "doctor", rating: 4.7, photo: "https://randomuser.me/api/portraits/men/45.jpg", link: "/doctor/robert-smith" },
  { name: "Dr. Olivia Brown", specialty: "Dermatologist", type: "doctor", rating: 4.8, photo: "https://randomuser.me/api/portraits/women/52.jpg", link: "/doctor/olivia-brown" },
  { name: "Dr. Ahmed Khan", specialty: "Pediatrician", type: "doctor", rating: 4.6, photo: "https://randomuser.me/api/portraits/men/82.jpg", link: "/doctor/ahmed-khan" },
  
  // Hospitals (Added)
  { name: "City Care Hospital", specialty: "Emergency & General", type: "hospital", rating: 4.5, photo: "https://images.unsplash.com/photo-1551076801-09415849925e?q=80&w=1770&auto=format&fit=crop", link: "/hospital/city-care" },
  { name: "Advanced Diagnostics Center", specialty: "Lab & Imaging", type: "hospital", rating: 4.7, photo: "https://images.unsplash.com/photo-1629904334341-a1e1b4b9b942?q=80&w=1770&auto=format&fit=crop", link: "/hospital/advanced-diag" },
];

export default function DoctorsHospitalsSection() {
  return (
    <div className="px-4 py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-4">
          Meet Our Featured Specialists & Centers 🧑‍⚕️🏥
        </h2>
        <p className="text-center text-xl text-slate-600 mb-16 max-w-3xl mx-auto">
            Book trusted doctors or find top-rated hospitals and diagnostic centers near you.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {featuredItems.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-6 w-full sm:w-[22rem] text-center transition-all duration-300 border border-slate-100 cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ 
                y: -5, // Lift on hover
                boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.2)", // Blue shadow
              }}
            >
              
              {/* Image/Icon */}
              <div className="relative mx-auto mb-4 w-28 h-28">
                {item.type === 'doctor' ? (
                    <img
                        src={item.photo}
                        alt={item.name}
                        className="w-full h-full rounded-full mx-auto object-cover ring-4 ring-blue-500/30 group-hover:ring-blue-600 transition duration-300"
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center mx-auto object-cover border-4 border-blue-500/30">
                        <FaHospital className="text-4xl text-blue-600" />
                    </div>
                )}
                {/* Rating Badge */}
                <div className="absolute bottom-0 right-0 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                    {item.rating} ★
                </div>
              </div>
              
              {/* Text Info */}
              <h4 className="font-extrabold text-xl text-slate-900 mt-2">{item.name}</h4>
              <p className={`text-slate-600 ${item.type === 'doctor' ? 'font-medium' : 'italic'}`}>{item.specialty}</p>

              {/* Button */}
              <Link href={item.link}>
                <motion.button
                  className={`mt-4 w-full transform px-4 py-2 rounded-full font-semibold transition-all duration-300
                    ${item.type === 'doctor' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/40' 
                                          : 'border border-blue-600 text-blue-600 hover:bg-blue-50'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.type === 'doctor' ? 'Book Appointment' : 'View Details'}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action Button */}
        <div className="text-center mt-12">
            <Link href="/doctors">
                <motion.button
                    className="bg-slate-800 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-slate-700 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Find More Doctors & Hospitals
                </motion.button>
            </Link>
        </div>
      </div>
    </div>
  );
}