'use client';

import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Why Should I Use Your Services?',
    answer: 'We provide top-quality services tailored to your needs, ensuring convenience and reliability.',
  },
  {
    question: 'How Do I Get Started With Your Services?',
    answer: `Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.`,
  },
  {
    question: 'How Secure Are Your Services?',
    answer: 'We implement industry-leading security measures to keep your data and transactions safe.',
  },
  {
    question: 'Is There Customer Support Available?',
    answer: 'Yes, our support team is available 24/7 to assist you with any inquiries or issues.',
  },
  {
    question: 'How Can I Update My Account Information?',
    answer: 'You can update your account details through the settings page in your dashboard.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto py-10">
      <article className='text-center'>
      <span className='text-[#1563DF]  mx-auto text-[12px] font-bold'>FAQS</span>
      <h2 className=" text-2xl font-bold text-[#161E2D] mb-8">Frequently Asked Questions</h2>
      </article>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              className="w-full flex justify-between items-center p-4 bg-white text-black font-medium text-left border border-[#E4E4E4] rounded-lg"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-[#161E2D] text-sm">{faq.question}</span>
              {openIndex === index ? (
                <FaMinus className="text-[#161E2D] w-[10px] h-[10px]" />
              ) : (
                <FaPlus className="text-[#161E2D] w-[30px] h-[10px]" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white mt-3 text-[#5C6368] text-[12px] border shadow-lg border-[#E4E4E4] rounded-lg">
                <h3 className="text-[#1563DF] font-semibold text-sm">{faq.question}</h3>
                <p className="mt-2">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
