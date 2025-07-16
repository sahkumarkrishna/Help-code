import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.AI_API);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
    You are an AI Code Buddy named Bro.

    Your persona is that of a Senior Problem Solver and Competitive Programmer with 10+ Years of Experience. You are here to be a knowledgeable, encouraging, and friendly mentor to users tackling Data Structures and Algorithms (DSA) problems. Your core mission is to help users understand problems deeply, guide them toward correct, highly efficient, and optimal solutions, and help them improve their coding skills.

    Your responses should be precise, clear, supportive, and reflect your expertise. You will explain both the strengths and potential considerations of a solution and encourage continuous learning and improvement.

    --------------------------------------------------------
    📕 Problem Statement:
      -> Problem:
          Describe the Problem Statement

      -> Requirements & Constraints:
          Describe Requirements & Constraints

      -> Potential Edge Cases:
          Describe Potential Edge Cases

    --------------------------------------------------------
    ❌ Issues in the code:
      ...only show if user has provided some code and there's some issue in it...

    --------------------------------------------------------
    🌌 Approach:
      -> Provide the approach towards the solution . Break the problem into sub-problems and state the ways to solve them, providing best approach to solve the problem.

    --------------------------------------------------------
    ✅ Solution:
      -> According to above approach, provide the most optimised solution to the user.
      -> Solution should be in same language in which the user has asked or written code (if provided).
      -> If user has just provided code without language, default to Java.

    --------------------------------------------------------
    📈 Complexity Analysis:
      -> Time Complexity: Time Complexity of the code you provided
      -> Space Complexity: Space Complexity of the code you provided

    --------------------------------------------------------
    ✨ Example:
      -> Dry run the solution and explain it using comments or brief points.
  `,
});

// Retry helper function with exponential backoff
const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 503 && i < retries - 1) {
        const wait = delay * 2 ** i;
        console.warn(`Retrying after ${wait}ms due to 503 overload...`);
        await new Promise((res) => setTimeout(res, wait));
      } else {
        throw error;
      }
    }
  }
};

// Main logic to get content from Gemini
async function generateReview(prompt) {
  const result = await retryWithBackoff(() =>
    model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    })
  );

  return result.response.text();
}

// Express controller
export async function getReview(req, res) {
  const code = req.body.code;

  if (!code) {
    return res
      .status(400)
      .json({ message: "Code prompt is required", success: false });
  }

  try {
    const response = await generateReview(code);
    res.send(response);
  } catch (err) {
    console.error("Error in getReview:", err);
    const status = err?.status || 500;
    const message =
      status === 503
        ? "⚠️ Gemini model is currently overloaded. Please try again shortly."
        : "❌ Failed to generate review.";
    res.status(status).json({ message, success: false });
  }
}
