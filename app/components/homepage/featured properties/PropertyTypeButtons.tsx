import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyTypeButtonsProps {
  onSelectType: (typeId: number | null) => void;
}

const PropertyTypeButtons: React.FC<PropertyTypeButtonsProps> = ({ onSelectType }) => {
  const propertyTypes: Record<number, string> = {
    1: "Duplex",
    2: "Terrace",
    3: "Bungalow",
    4: "Apartments",
    5: "Commercial",
    6: "Carcass",
    7: "Land",
    8: "JV Land",
  };

  const [selectedType, setSelectedType] = useState<number | null>(null);

  const handleClick = (id: number | null) => {
    setSelectedType(id);
    onSelectType(id);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const highlightVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      transition: { 
        duration: 0.2 
      }
    }
  };

  const buttonHoverVariants = {
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95 
    }
  };

  return (
    <motion.div 
      className="flex flex-wrap gap-4 md:gap-6 justify-center mb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* View All Button */}
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.button
          className={`px-6 md:px-8 py-2 rounded-full text-[12px] md:text-[14px] cursor-pointer relative overflow-hidden
                    ${selectedType === null ? "bg-[#161E2D] text-white" : "bg-[#F7F7F7] text-[#161E2D]"}`}
          onClick={() => handleClick(null)}
          variants={buttonHoverVariants}
        >
          <AnimatePresence>
            {selectedType === null && (
              <motion.span
                className="absolute inset-0 bg-[#161E2D] -z-10"
                variants={highlightVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            )}
          </AnimatePresence>
          View All
        </motion.button>
      </motion.div>

      {/* Property Type Buttons */}
      {Object.entries(propertyTypes).map(([id, type]) => (
        <motion.div
          key={id}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.button
            className={`px-6 py-2 rounded-full text-[12px] cursor-pointer relative overflow-hidden
                      ${selectedType === Number(id) ? "bg-[#161E2D] text-white" : "bg-[#F7F7F7] text-[#161E2D]"}`}
            onClick={() => handleClick(Number(id))}
            variants={buttonHoverVariants}
          >
            <AnimatePresence>
              {selectedType === Number(id) && (
                <motion.span
                  className="absolute inset-0 bg-[#161E2D] -z-10"
                  variants={highlightVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />
              )}
            </AnimatePresence>
            {type}
          </motion.button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PropertyTypeButtons;