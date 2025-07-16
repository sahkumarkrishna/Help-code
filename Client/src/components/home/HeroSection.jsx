import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r bg-[#0F0F2E] text-white py-16 px-4">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <span className="mx-auto px-4 py-2 rounded-full bg-purple-300 text-[#001F3F] font-semibold shadow-md">
          The Best Coding Buddy You Have
        </span>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Solve, Optimize &
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
            Review
          </span>{" "}
          Your Code
        </h1>

        {/* Optional Subtext */}
        <p className="text-gray-300 text-lg font-medium max-w-2xl mx-auto">
          Powered by AI, built for developers. Enhance code quality,
          performance, and clarity — all in one platform.
        </p>

        {/* Typewriter Code Block */}
        <div className="bg-[#0D1B2A] text-left font-mono text-sm md:text-base text-green-400 px-6 py-4 mt-6 rounded-lg shadow-md w-full max-w-2xl mx-auto border border-[#1A2B3C]">
          <Typewriter
            words={[
              "// 💡 Quick Tech Facts:",
              "💡 Java: Write once, run anywhere!",
              "💡 Go: Lightweight concurrency with goroutines.",
              "💡 Python: Great for prototyping and readability.",
              "💡 C++: High performance with low-level control.",
              "💡 JavaScript: Async via event loop.",
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
