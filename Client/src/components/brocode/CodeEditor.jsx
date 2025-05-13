import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css"; // Prism dark theme
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/components/prism-javascript"; // JavaScript highlighting
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { REVIEW_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useAuth } from "../../contexts/authContext"; // <-- Import useAuth to access token

const CodeEditor = () => {
  const placeholder = `// Enter your code / problem name / leetcode - question number`;
  const [code, setCode] = useState(placeholder);
  const [hasTyped, setHasTyped] = useState(false);

  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth(); // <-- Use token from AuthContext

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const handleCodeChange = (newCode) => {
    // If the user is typing, remove the placeholder text
    if (!hasTyped && newCode !== placeholder) {
      setHasTyped(true);
      setCode(newCode);
    } else {
      setCode(newCode);
    }
  };

  const handleFocus = () => {
    if (!hasTyped && code === placeholder) {
      setHasTyped(true);
      setCode("");
    }
  };

  async function reviewCode() {
    setLoading(true);

    try {
      // Check if token is available
      if (!token) {
        setReview("You need to log in first.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${REVIEW_API_END_POINT}/review-code`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from context
          },
          withCredentials: true, 
        }
      );

      setReview(response.data);
    } catch (error) {
      console.error("Error:", error.response || error);
      setReview("Error fetching review. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#001F3F] text-white px-6 py-8">
      <main className="flex flex-col gap-6">
        {/* Code Editor Section */}
        <section className="bg-[#002b5c] p-4 rounded-2xl shadow-md flex flex-col">
          <label className="text-lg font-semibold text-[#FFD700] mb-2">Your Code</label>
          <Editor
            value={code}
            onValueChange={handleCodeChange}
            onFocus={handleFocus}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #003366",
              borderRadius: "0.5rem",
              minHeight: "300px",
              backgroundColor: "#002b5c", // Matches dark theme
              overflow: "auto",
              whiteSpace: "pre-wrap",
              // Do NOT set `color` manually — let Prism handle it
            }}
          />
          <button
            onClick={reviewCode}
            className="mt-4 bg-[#FFD700] text-[#001F3F] font-semibold py-2 rounded hover:bg-black hover:text-white transition-all"
          >
            {loading ? "Reviewing..." : "Review"}
          </button>
        </section>

        {/* Review Output Section */}
        <section className="bg-[#002b5c] p-4 rounded-2xl shadow-md overflow-x-auto whitespace-pre-wrap break-words">
          <h2 className="text-xl font-bold mb-3 text-[#FFD700]">Review Output</h2>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div
              className="text-[#FFD700] whitespace-pre-wrap break-words leading-relaxed space-y-4"
              style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
            >
              <Markdown rehypePlugins={[rehypeHighlight]}>
                {review.trim()}
              </Markdown>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CodeEditor;
