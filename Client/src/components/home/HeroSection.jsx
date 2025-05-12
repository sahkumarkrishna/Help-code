import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const HeroSection = () => {
  return (
    <div className="text-white py-16 px-4">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto text-center">
        <span className="mx-auto px-4 py-2 rounded-full bg-[#001F3F] font-semibold shadow-md">
          The Best Coding Buddy You Have
        </span>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          <span className="text-[#FFD700]">Solve, Optimize &</span><br />
          <span className="text-[#FFD700]">Review</span> Your Code
        </h1>

        <p className="text-gray-300 text-lg font-medium max-w-2xl mx-auto">
          Elevate your coding expertise with AI-powered support. <br />
          Receive tailored solutions, code reviews, and optimization insights all in one platform.
        </p>

        {/* Typing Animation for Code Snippets */}
        <div className="bg-[#0D1B2A] text-left font-mono text-sm md:text-base text-green-400 px-6 py-4 mt-6 rounded-lg shadow-md w-full max-w-2xl mx-auto border border-[#1A2B3C]">
          <Typewriter
            words={[
                '// 💡 Quick Tech Facts:',
                '💡 Java: Write once, run anywhere! Java bytecode runs on any device with a JVM.',
                '💡 Go: Go\'s goroutines enable highly efficient concurrent programming with ease.',
                '💡 Python: Known for its readability and dynamic typing, great for quick prototyping.',
                '💡 C++: Offers low-level memory control and high performance, a staple in competitive programming.',
                '💡 JavaScript: Single-threaded but handles asynchronous tasks efficiently via the event loop.',
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={65}
            deleteSpeed={40}
            delaySpeed={2000}
           />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;