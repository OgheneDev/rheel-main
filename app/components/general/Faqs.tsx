'use client';

import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: ' How does Rheel Estate Limited help buyers and lessees?',
    answer: 'Rheel Estate Limited facilitates secure and transparent property transactions by acting as the sole link between buyers and property owners. We ensure a smooth, direct process with no middlemen or chain transactions, making property acquisition and leasing seamless.',
  },
  {
    question: 'What makes Rheel Estate different from other real estate companies?',
    answer: ` Rheel Estate stands out by offering: Direct transactions—no intermediaries, ensuring transparency and trust. A secure platform for Nigerians in the diaspora to buy and lease properties with confidence. Full transaction representation for clients who wish to remain anonymous or are unavailable. Professional property management services for property owners`,
  },
  {
    question: 'Can Nigerians in the diaspora buy property through Rheel Estate?',
    answer: 'Yes! We provide a safe and seamless process for Nigerians abroad to buy or lease properties. We also offer long-term property financing options, allowing diaspora clients to purchase properties and repay in their local currency.',
  },
  {
    question: 'Does Rheel Estate handle property management?',
    answer: ' Yes, we provide full property management services, including lease agreement management, property maintenance, and financial record-keeping. Our service ensures property owners maximize returns while we handle day-to-day operations.',
  },
  {
    question: ' How can I list my property with Rheel Estate?',
    answer: 'Property owners can list their properties filling out a call-back form via the app or website. Once listed, we handle all marketing, inquiries, and transactions, ensuring a direct and professional process without third-party involvement',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3
      }
    }
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <section id='faq' className="max-w-5xl mx-auto py-10 px-5 md:px-0">
      <motion.article 
        className='text-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className='text-[#1563DF] mx-auto text-[12px] font-bold'>FAQS</span>
        <h2 className="text-2xl font-bold text-[#161E2D] mb-8">Frequently Asked Questions</h2>
      </motion.article>

      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
          >
            <motion.button
              className="w-full flex justify-between items-center p-4 bg-white text-black font-medium text-left border border-[#E4E4E4] rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="text-[#161E2D] text-sm">{faq.question}</span>
              <motion.div
                variants={iconVariants}
                animate={openIndex === index ? "open" : "closed"}
                transition={{ duration: 0.2 }}
              >
                {openIndex === index ? (
                  <FaMinus className="text-[#161E2D] w-[10px] h-[10px]" />
                ) : (
                  <FaPlus className="text-[#161E2D] w-[30px] h-[10px]" />
                )}
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="p-4 bg-white mt-3 text-[#5C6368] text-[12px] border shadow-lg border-[#E4E4E4] rounded-lg overflow-hidden"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={contentVariants}
                >
                  <motion.h3 
                    className="text-[#1563DF] font-semibold text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {faq.question}
                  </motion.h3>
                  <motion.p 
                    className="mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {faq.answer}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FAQSection;
