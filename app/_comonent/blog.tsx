"use client";

// ইমপোর্ট ঠিক করা হলো: 'motion/react' এর পরিবর্তে 'framer-motion'
import { motion } from "framer-motion";
import { FiBookOpen, FiHeart, FiGlobe, FiArrowRight, FiActivity } from "react-icons/fi";
import Link from "next/link"; // Assuming navigation links

const blogPosts = [
  { 
    title: "AI in Healthcare", 
    description: "Learn how Artificial Intelligence is rapidly transforming modern medicine, improving diagnosis and patient care.", 
    image: "https://images.unsplash.com/photo-1588776814546-4b6f74eeb208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    icon: FiActivity, // Activity icon for AI/Tech
    link: "/blog/ai-in-healthcare"
  },
  { 
    title: "Global Health Updates", 
    description: "Stay informed about the latest public health news, disease control efforts, and global medical breakthroughs.", 
    image: "https://images.unsplash.com/photo-1580281657527-2f1c7f0892c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    icon: FiGlobe, // Globe icon for global news
    link: "/blog/covid-updates"
  },
  { 
    title: "Daily Wellness Tips", 
    description: "Simple, practical ways to maintain good physical and mental health every day with easy routine changes.", 
    image: "https://images.unsplash.com/photo-1596484555052-ffea84c8b7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    icon: FiHeart, // Heart icon for wellness
    link: "/blog/health-tips"
  },
];

export default function BlogTipsSection() {
  return (
    <div className="px-4 py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-4">
          <FiBookOpen className="inline-block text-blue-600 mr-3 align-middle" /> 
          Latest Health Insights
        </h2>
        <p className="text-center text-xl text-slate-600 mb-16 max-w-3xl mx-auto">
            Stay up-to-date with our expert articles on technology, wellness, and medical news.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {blogPosts.map((post, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-xl w-80 overflow-hidden transition-all duration-300 border border-slate-100 cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ 
                y: -5, // Lift on hover
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.2)", // Subtle blue shadow
              }}
            >
              <Link href={post.link} className="block">
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-blue-900/10 transition-opacity duration-300 group-hover:bg-blue-900/20"></div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-center mb-3 text-blue-600">
                    <post.icon className="text-xl mr-2" />
                    <span className="text-sm font-semibold uppercase">{post.title}</span>
                  </div>
                  
                  <h4 className="font-extrabold text-2xl text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition duration-300">
                    {post.title}
                  </h4>
                  <p className="text-slate-600 text-base mb-4">
                    {post.description}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition duration-300">
                    Read More 
                    <FiArrowRight className="ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}