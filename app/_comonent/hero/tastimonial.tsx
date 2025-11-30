"use client";

// ইমপোর্ট ঠিক করা হলো: 'motion/react' এর পরিবর্তে 'framer-motion'
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa"; // Testimonial-এর জন্য কোট আইকন যোগ করা হলো

const testimonials = [
  {
    name: "Sarah J.",
    role: "Happy Patient",
    text: "The AI assistant gave me instant, accurate insights and helped me book a doctor's appointment in minutes. Healthcare has never been this seamless!",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "John D.",
    role: "Regular User",
    text: "I can easily track my symptoms and get personalized advice anytime, right from my phone. This platform is truly amazing and reliable.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emma W.",
    role: "Verified Patient",
    text: "Finding highly-rated doctors and nearby hospitals is incredibly easy. The integration of AI makes managing my family's health simple and efficient.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <div className="px-4 py-16 md:py-24 bg-gray-50"> {/* Background changed to soft gray */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-4">
          Trusted by Our Users 🌟
        </h2>
        <p className="text-center text-xl text-slate-600 mb-16 max-w-3xl mx-auto">
            Real experiences from people who transformed their healthcare journey with our AI platform.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-8 max-w-sm shadow-xl transition-all duration-300 border border-slate-100 cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ 
                y: -8, // Lift on hover
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)", // Blue shadow
              }}
            >
              <FaQuoteLeft className="text-blue-500 text-3xl mb-4 opacity-70 group-hover:opacity-100 transition duration-300" />
              
              {/* Testimonial Text */}
              <p className="text-lg text-slate-800 italic mb-6 leading-relaxed">
                "{t.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 border-t pt-4 border-slate-100">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/50 group-hover:ring-blue-600 transition duration-300"
                />
                <div>
                  <h4 className="font-bold text-xl text-slate-900 group-hover:text-blue-700 transition duration-300">{t.name}</h4>
                  <p className="text-sm text-blue-600 font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}