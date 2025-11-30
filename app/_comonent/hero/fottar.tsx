"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // LinkedIn যোগ করা হলো
import { FaStethoscope } from "react-icons/fa"; // লোগোর জন্য আইকন
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi"; // যোগাযোগের জন্য আইকন
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white px-4 py-16">
      <div className="max-w-7xl mx-auto border-b border-slate-700 pb-10 mb-8">
        
        {/* --- Main Grid Layout --- */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-12">
          
          {/* 1. Brand Info & Mission */}
          <div className="col-span-2 md:col-span-2 pr-4">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <FaStethoscope className="text-3xl text-blue-500 group-hover:text-blue-400 transition duration-300" />
              <h3 className="font-extrabold text-2xl text-white">MedAI Hub</h3>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm">
              AI-powered healthcare solutions for smarter diagnostics, instant consultations, and superior patient care.
            </p>
            {/* Social Links Here for better visibility */}
            <div className="flex gap-4 mt-6 text-blue-500">
                <a href="#" aria-label="Facebook" className="hover:text-white transition duration-200">
                    <FaFacebookF className="text-xl" />
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-white transition duration-200">
                    <FaTwitter className="text-xl" />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-white transition duration-200">
                    <FaInstagram className="text-xl" />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-white transition duration-200">
                    <FaLinkedinIn className="text-xl" />
                </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-lg mb-2 border-b border-blue-500/50 pb-1 w-fit">Quick Links</h4>
            <Link href="/" className="text-slate-400 hover:text-blue-500 transition-colors duration-200 text-sm">Home</Link>
            <Link href="/features" className="text-slate-400 hover:text-blue-500 transition-colors duration-200 text-sm">Features</Link>
            <Link href="/doctors" className="text-slate-400 hover:text-blue-500 transition-colors duration-200 text-sm">Find Doctors</Link>
            <Link href="/hospitals" className="text-slate-400 hover:text-blue-500 transition-colors duration-200 text-sm">Hospitals</Link>
          </div>
          
          {/* 3. Company/Legal Links (New Section) */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-lg mb-2 border-b border-blue-500/50 pb-1 w-fit">Company</h4>
            <Link href="/about" className="text-slate-400 hover:text-blue-500 transition-colors duration-200 text-sm">About Us</Link>
            <Link href="/careers" className="text-slate-400 hover:text-blue-500 transition-colors duration-200 text-sm">Careers</Link>
            <Link href="/privacy" className="text-slate-400 hover:text-blue-500 transition-colors duration-200 text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-blue-500 transition-colors duration-200 text-sm">Terms of Service</Link>
          </div>

          {/* 4. Contact Info */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <h4 className="font-bold text-lg mb-2 border-b border-blue-500/50 pb-1 w-fit">Contact</h4>
            <div className="flex items-center text-slate-400 gap-3 text-sm hover:text-blue-500 transition-colors duration-200">
                <FiMail className="flex-shrink-0 text-lg text-blue-500" />
                <a href="mailto:support@medaihub.com">support@medaihub.com</a>
            </div>
            <div className="flex items-center text-slate-400 gap-3 text-sm hover:text-blue-500 transition-colors duration-200">
                <FiPhone className="flex-shrink-0 text-lg text-blue-500" />
                <a href="tel:+880123456789">+880 123 456 789</a>
            </div>
            <div className="flex items-center text-slate-400 gap-3 text-sm">
                <FiMapPin className="flex-shrink-0 text-lg text-blue-500" />
                <span>Dhaka, Bangladesh (HQ)</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Copyright Section --- */}
      <div className="text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} **MedAI Hub**. All rights reserved. | Built with 💙 for Smarter Healthcare.
      </div>
    </footer>
  );
}