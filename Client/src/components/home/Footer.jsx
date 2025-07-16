import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#003153] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Column 1 - Logo & Intro */}
        <div>
          <h3 className="text-2xl font-bold text-[#FFD700]">HelpCode</h3>
          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            Your AI-powered coding companion for smart, efficient, and clean development.
          </p>
        </div>

        {/* Column 2 - Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-[#FFD700] mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:text-[#FFD700] transition-colors">Home</a>
            </li>
           
            <li>
              <a href="/login" className="hover:text-[#FFD700] transition-colors">Login</a>
            </li>
            <li>
              <a href="/signup" className="hover:text-[#FFD700] transition-colors">Get Started</a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact & Social */}
        <div>
          <h4 className="text-lg font-semibold text-[#FFD700] mb-4">Contact Us</h4>
          <p className="text-sm text-gray-300 mb-3">
            Email:{" "}
            <a
              href="mailto:kumarkrishna9801552@gmail.com"
              className="hover:text-[#FFD700] transition-colors"
            >
              kumarkrishna9801552@gmail.com
            </a>
          </p>

          <div className="flex items-center space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="text-white hover:text-[#FFD700] transition text-lg">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="text-white hover:text-[#FFD700] transition text-lg">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="text-white hover:text-[#FFD700] transition text-lg">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-white hover:text-[#FFD700] transition text-lg">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
        <p>
          &copy; 2025 <span className="text-[#FFD700] font-medium">HelpCode</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
