import React, { useState } from 'react';

const faqs = [
  {
    question: "What is BroCode?",
    answer: "BroCode is an AI-powered coding assistant that helps solve DSA-related problems by providing efficient, optimal solutions with time and space complexity analysis. It assists with clarifying problems, identifying edge cases, and offering well-explained solutions for competitive programming and coding interviews."
  },
  {
    question: "How does the AI code assistant work?",
    answer: "The AI code assistant analyzes your code and suggests improvements, optimizations, and provides solutions to common coding problems."
  },
  {
    question: "Can I integrate BroCode into my current coding environment?",
    answer: "Currently, integration with your coding environment is not supported. But you may see it in next update."
  },
  {
    question: "Is BroCode free to use?",
    answer: "Yes, BroCode is completely free to use."
  },
  {
    question: "What languages does BroCode support?",
    answer: "It supports Java, JavaScript, C++, Python and many more popular languages."
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#001F3F] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#FFD700] text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-700 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <span className="text-[#6A38C2] font-bold">
                  {openIndex === index ? '-' : '+'}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-lg text-gray-300 mt-3 ml-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
