'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import Swal from 'sweetalert2';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMinimized?: boolean;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose, defaultMinimized = false }) => {
  const [isMinimized, setIsMinimized] = useState(defaultMinimized);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    phone: ''
  });

  // Add this useEffect to handle the defaultMinimized prop
  useEffect(() => {
    setIsMinimized(defaultMinimized);
  }, [defaultMinimized]);

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.country || !formData.email) {
      Swal.fire({
        title: "Warning!",
        text: "Please fill in all required fields before submitting.",
        icon: "warning"
      });
      return;
    }

    setLoading(true);

    // Construct mailto link
    const recipient = "admin@rheel.ng";
    const subject = encodeURIComponent("Application to join mailing list.");
    const body = encodeURIComponent(`
Contact Information:

Name: ${formData.firstName} ${formData.lastName}
Country: ${formData.country}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}
    `);

    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    setLoading(false);
    onClose();
  };

  const popupVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const minimizedVariants = {
    hidden: { y: '100%' },
    visible: { y: 0 }
  };

  return (
    <AnimatePresence>
      {(isOpen || defaultMinimized) && (
        isMinimized ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={minimizedVariants}
            className="fixed bottom-0 right-4 bg-[#0A2F1E] text-white p-4 rounded-t-lg cursor-pointer z-50"
            onClick={toggleMinimized}
          >
            <div className="flex items-center gap-2">
              <Maximize2 size={20} />
              <span>Join our mailing list.</span>
            </div>
          </motion.div>
        ) : (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={popupVariants}
              className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-xl"
            >
              <div className="flex justify-between items-start p-4 border-b">
                <article>
                <h2 className="text-xl font-semibold text-[#161E2D] mb-1">Stay Ahead with Rheel Estate.</h2>
                <p className='text-sm'>Join our mailing list for secure, fast, and reliable property transactions—plus exclusive access to deals, discounts, and investment opportunities.</p>
                </article>
                <div className="flex gap-2">
                  <button
                    onClick={toggleMinimized}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  >
                    <Minimize2 size={20} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#161E2D] block mb-1">First Name*</label>
                    <input
                      required
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none focus:border-[#0A2F1E]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#161E2D] block mb-1">Last Name*</label>
                    <input
                      required
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none focus:border-[#0A2F1E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#161E2D] block mb-1">Country*</label>
                  <input
                    required
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none focus:border-[#0A2F1E]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#161E2D] block mb-1">Email Address*</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none focus:border-[#0A2F1E]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#161E2D] block mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none focus:border-[#0A2F1E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0A2F1E] text-white py-3 rounded-full text-sm font-medium hover:bg-[#0d3b27] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Preparing Email...' : 'Submit'}
                </button>
              </form>
            </motion.div>
          </div>
        )
      )}
    </AnimatePresence>
  );
};

export default ContactPopup;
