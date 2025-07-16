import React from 'react';
import { Link } from 'react-router-dom';
import aboutImage from '../../assets/AI.png'; // Update if needed

const About = () => {
  return (
    <div className="bg-gradient-to-r from-[#0D1B2A] via-[#001F3F] to-[#0D1B2A] text-white min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Right: Image (placed first on mobile using order) */}
        <div className="flex justify-center order-1 md:order-2">
          <img
            src={aboutImage}
            alt="AI Coding Assistant"
            className="rounded-xl shadow-lg max-w-full h-auto"
          />
        </div>

        {/* Left: Text Content (placed below image on mobile using order) */}
        <div className="space-y-8 order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFD700]">
            About <span className="text-white">HelpCode</span>
          </h1>

          <p className="text-gray-300 text-lg">
            HelpCode is your intelligent AI-powered coding companion built to guide, optimize, and review your code — whenever you need it.
          </p>

          <div className="space-y-4 text-gray-300 text-base">
            <p>
              Whether you’re just starting your journey or you're a seasoned engineer,
              HelpCode provides real-time assistance that improves the way you code and learn.
            </p>
            <p>
              Our platform offers AI-powered reviews, debugging, and optimization tips for JavaScript, Python, Java, C++, and more.
            </p>
            <p>
              Think of HelpCode as your 24/7 coding mentor — ready to explain, fix, and improve your work.
            </p>
          </div>

          <Link
            to="/signup"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 font-semibold rounded-xl hover:bg-white hover:text-black transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
