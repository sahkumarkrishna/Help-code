import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#003153] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Logo and Email */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo / Info */}
          <div>
            <h3 className="text-xl font-bold text-[#FFD700]">BroCode</h3>
            <p className="mt-2 text-sm text-gray-300 max-w-sm">
              The Best Coding Buddy You Have.
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="mt-4 md:mt-0 text-right">
            <h4 className="text-xl font-bold text-[#FFD700]">Contact Us</h4>
            <p className="mt-2 text-sm text-gray-300 max-w-sm">
              Email:{" "}
              <a
                href="mailto:brocodehelper@gmail.com"
                className="hover:underline"
              >
                brocodehelper@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 <span className="text-[#FFD700]">BroCode</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
