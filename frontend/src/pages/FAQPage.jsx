import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      question: "How do I report a problem?",
      answer: "You can report a problem by clicking the 'Report a Problem' button..."
    },
    {
      question: "How long does it take to resolve an issue?",
      answer: "Resolution times vary depending on the type and severity of the issue..."
    },
    // Add more FAQs
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-sky-600">
          Frequently Asked Questions
        </h1>
        
        <div className="text-gray-600 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center"
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? <FiMinus /> : <FiPlus />}
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 border-t">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;