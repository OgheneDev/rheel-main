import { useState, ChangeEvent, FormEvent } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { propertyTypes } from '@/app/types';
import Swal from 'sweetalert2';

interface RequestListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestListingModal: React.FC<RequestListingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    propertyAddress: '',
    propertyType: '',
    transactionType: 'Sell', // Default value
    propertyStatus: 'Completed', // Default value
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!Object.values(formData).every(field => field)) {
      Swal.fire({
        title: "Warning!",
        text: "Please fill in all fields before submitting.",
        icon: "warning"
      });
      return;
    }

    setLoading(true);

    // Construct mailto link
    const recipient = "hello@rheelestate.com";
    const subject = encodeURIComponent("New Property Listing Request");
    const body = encodeURIComponent(`
     Property Listing Request Details:

     Contact Information:
     - Name: ${formData.firstName} ${formData.lastName}
     - Email: ${formData.email}
     - Phone: ${formData.phone}

     Property Details:
     - Address: ${formData.propertyAddress}
     - Property Type: ${formData.propertyType}
     - Transaction Type: ${formData.transactionType}
     - Property Status: ${formData.propertyStatus}
    `);

    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-[#161E2D]">Request Property Listing</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#161E2D] block mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#161E2D] block mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#161E2D] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#161E2D] block mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#161E2D] block mb-1">Property Address</label>
                <input
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none"
                  placeholder="Enter property address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#161E2D] block mb-1">Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none"
                  >
                    <option value="">Select type</option>
                    {Object.values(propertyTypes).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#161E2D] block mb-1">Transaction Type</label>
                  <select
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleChange}
                    className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none"
                  >
                    <option value="Sell">Sell</option>
                    <option value="Lease">Lease</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#161E2D] block mb-1">Property Status</label>
                <select
                  name="propertyStatus"
                  value={formData.propertyStatus}
                  onChange={handleChange}
                  className="w-full border border-[#E4E4E4] rounded-full px-4 py-2 text-sm outline-none"
                >
                  <option value="Completed">Completed</option>
                  <option value="Off-plan">Off-plan</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A2F1E] text-white py-3 rounded-full text-sm font-medium hover:bg-[#0d3b27] transition-colors"
              >
                {loading ? 'Preparing Email...' : 'Submit Listing Request'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestListingModal;
