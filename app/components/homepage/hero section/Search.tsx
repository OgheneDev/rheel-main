'use client'

import { useState, useEffect, useRef } from "react"
import { useSearch } from "@/app/context/SearchContext"
import { propertyTypes } from "@/app/types"
import { ChevronDown, Search as SearchIcon, Sliders, Locate, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getProperties } from '@/app/api/properties/requests'

interface Property {
    location: string;
    // add other property fields as needed
}

const Search = () => {
    const [activeTab, setActiveTab] = useState('For Sale');
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('All type');
    const { setSearchParams } = useSearch();
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

    // Add new state variables
    const [locations, setLocations] = useState<string[]>([]);
    const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const locationInputRef = useRef<HTMLInputElement>(null);

    const toggleMobileSearch = () => {
        setIsMobileSearchExpanded(!isMobileSearchExpanded);
    };

    // Fetch properties and extract unique locations
    // ...existing code...
useEffect(() => {
    const fetchLocations = async () => {
        try {
            const properties = await getProperties();
            const uniqueLocations = Array.from(
                new Set(properties.map((prop: Property) => prop.location))
            ).filter((location): location is string => Boolean(location));
            setLocations(uniqueLocations);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    fetchLocations();
}, []);
// ...existing code...

    // Function to handle tab change
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        
        // If search is already active, update search parameters immediately
        const propertyTypeId = propertyType === 'All type' 
            ? '' 
            : Object.entries(propertyTypes).find(([key, value]) => value === propertyType)?.[0] || '';
            
        setSearchParams(prev => ({
            ...prev,
            type: tab === 'For Sale' ? 'Sell' : 'Lease',
            isSearchActive: true
        }));
    };

    const handleSearch = () => {
        // Find the property type ID based on the selected value
        const propertyTypeId = propertyType === 'All type' 
            ? '' 
            : Object.entries(propertyTypes).find(([key, value]) => value === propertyType)?.[0] || '';

        setSearchParams({
          type: activeTab === 'For Sale' ? 'Sell' : 'Lease',
          propertyTypeId: propertyTypeId,
          location: location,
          isSearchActive: true // Set to true when search is initiated
        });
    
        // Scroll to property list
        const propertyList = document.getElementById('properties-section');
        if (propertyList) {
          propertyList.scrollIntoView({ behavior: 'smooth' });
        }

        console.log("Search initiated with:", {
            type: activeTab === 'For Sale' ? 'Sell' : 'Lease',
            propertyTypeId: propertyTypeId,
            location: location,
            isSearchActive: true
        });
    };

    // Filter locations based on input
    const handleLocationInput = (value: string) => {
        setLocation(value);
        if (value.length > 0) {
            const filtered = locations.filter(loc =>
                loc.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredLocations(filtered);
            setShowLocationDropdown(true);
        } else {
            setFilteredLocations([]);
            setShowLocationDropdown(false);
        }
    };

    // Handle location selection
    const handleLocationSelect = (selectedLocation: string) => {
        setLocation(selectedLocation);
        setShowLocationDropdown(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
                setShowLocationDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Animation variants
    const tabsContainerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5,
                ease: "easeOut" 
            }
        }
    };

    const searchContainerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2
            }
        }
    };

    const dropdownVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -10 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.95, 
            y: -10,
            transition: { 
                duration: 0.2 
            }
        }
    };

    const mobileExpandVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { 
            opacity: 1, 
            height: "auto",
            transition: { 
                duration: 0.3, 
                ease: "easeInOut" 
            }
        },
        exit: { 
            opacity: 0, 
            height: 0,
            transition: { 
                duration: 0.3, 
                ease: "easeInOut" 
            }
        }
    };

    const buttonHoverVariants = {
        hover: { 
            scale: 1.03,
            transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 10 
            }
        },
        tap: { 
            scale: 0.97 
        }
    };

    return (
        <div>
            {/* For Lease/Sale buttons */}
            <motion.div 
                className="flex items-center gap-5 justify-center mb-4"
                variants={tabsContainerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.button
                    className={`px-8 py-2 cursor-pointer rounded-full ${activeTab === 'For Lease' ? 'bg-[#0A2F1E] text-white' : 'bg-transparent border border-white'}`}
                    onClick={() => handleTabChange('For Lease')}
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    For Lease
                </motion.button>
                <motion.button
                    className={`px-8 py-2 cursor-pointer rounded-full ${activeTab === 'For Sale' ? 'bg-[#0A2F1E] text-white' : 'bg-transparent border border-white'}`}
                    onClick={() => handleTabChange('For Sale')}
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    For Sale
                </motion.button>
            </motion.div>

            {/* Desktop Search container */}
            <motion.div 
                className="bg-white rounded-full md:flex hidden items-center shadow-md w-[80%] mx-auto h-16 py-3"
                variants={searchContainerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Type dropdown */}
                <div className="w-1/4 border-r border-gray-200 h-full px-6">
                    <div className="h-full flex flex-col justify-center relative" onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}>
                        <div className="text-[12px] text-gray-500 mb-1 text-left">Type</div>
                        <div className="flex items-center justify-between cursor-pointer w-full">
                            <span className="font-semibold text-[12px] text-[#0A2F1E]">{propertyType}</span>
                            <motion.div
                                animate={{ rotate: isTypeDropdownOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown size={16} className="text-gray-500" />
                            </motion.div>
                        </div>
                        
                        <AnimatePresence>
                            {isTypeDropdownOpen && (
                                <motion.div 
                                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded border border-gray-200 shadow-lg z-10"
                                    variants={dropdownVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div 
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[12px] text-[#0A2F1E]"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPropertyType('All type');
                                            setIsTypeDropdownOpen(false);
                                        }}
                                    >
                                        All type
                                    </div>
                                    {Object.entries(propertyTypes).map(([key, value]) => (
                                        <div 
                                            key={key}
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[12px] text-[#0A2F1E]"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPropertyType(value);
                                                setIsTypeDropdownOpen(false);
                                            }}
                                        >
                                            {value}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Location input */}
                <div className="w-2/5 border-r border-gray-200 h-full px-6">
                    <div className="h-full flex flex-col justify-center relative" ref={locationInputRef}>
                        <div className="text-xs text-gray-500 mb-1 text-left">Location</div>
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                placeholder="Search Location"
                                className="w-full outline-none text-sm text-[#161E2D] placeholder:text-[#161E2D] placeholder:font-semibold placeholder:text-[12px]"
                                value={location}
                                onChange={(e) => handleLocationInput(e.target.value)}
                                onFocus={() => setShowLocationDropdown(true)}
                            />
                            <motion.div 
                                className="w-6 h-6 flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Locate className="w-4 h-4 text-[#5C6368]" />
                            </motion.div>
                        </div>

                        {/* Location suggestions dropdown */}
                        <AnimatePresence>
                            {showLocationDropdown && filteredLocations.length > 0 && (
                                <motion.div
                                    className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {filteredLocations.map((loc, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                                            onClick={() => handleLocationSelect(loc)}
                                        >
                                            {loc}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Search buttons */}
                <div className=" px-4  flex items-center justify-end space-x-2">
                    {/* Advanced Search button */}
                    <motion.button 
                        className="flex items-center cursor-pointer rounded-full border border-[#0A2F1E]  px-4 py-2 bg-white"
                        variants={buttonHoverVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <span className="text-[12px] font-semibold text-[#0A2F1E] mr-2">Search advanced</span>
                        <Sliders size={14} className="text-[#0A2F1E]" />
                    </motion.button>
                    
                    {/* Search button */}
                    <motion.button 
                        onClick={handleSearch}
                        className="bg-[#0A2F1E] cursor-pointer text-white flex items-center gap-2 rounded-full px-6  py-2"
                        variants={buttonHoverVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <span className="text-[12px]">Search</span>
                        <SearchIcon size={16} />
                    </motion.button>
                </div>
            </motion.div>

            {/* Mobile Search */}
            <div className="md:hidden w-full ">
                {/* Collapsed Mobile Search Button */}
                <AnimatePresence mode="wait">
                    {!isMobileSearchExpanded && (
                        <motion.button 
                            onClick={toggleMobileSearch}
                            className="bg-white rounded-full shadow-md w-full py-3 px-4 flex items-center justify-between"
                            variants={searchContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center">
                                <SearchIcon size={16} className="text-gray-500 mr-2" />
                                <span className="text-sm text-gray-500">Search location, property type...</span>
                            </div>
                            <Sliders size={16} className="text-gray-500" />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Expanded Mobile Search Form */}
                <AnimatePresence>
                    {isMobileSearchExpanded && (
                        <motion.div 
                            className="bg-white rounded-lg shadow-md w-full p-4"
                            variants={mobileExpandVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <motion.h3 
                                    className="font-medium"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                                >
                                    Search Properties
                                </motion.h3>
                                <motion.button 
                                    onClick={toggleMobileSearch}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X size={20} className="text-gray-500" />
                                </motion.button>
                            </div>

                            {/* Property Type Selection */}
                            <motion.div 
                                className="mb-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ 
                                    opacity: 1, 
                                    y: 0, 
                                    transition: { delay: 0.3 } 
                                }}
                            >
                                <label className="text-xs text-gray-500 mb-1 block text-left">Property Type</label>
                                <div className="relative">
                                    <motion.button 
                                        className="w-full text-left flex items-center justify-between border text-[#0A2F1E] border-gray-200 rounded-lg p-3"
                                        onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                                        whileHover={{ backgroundColor: "#f7f7f7" }}
                                    >
                                        <span className="text-sm">{propertyType}</span>
                                        <motion.div
                                            animate={{ rotate: isTypeDropdownOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronDown size={16} className="text-gray-500" />
                                        </motion.div>
                                    </motion.button>
                                    
                                    <AnimatePresence>
                                        {isTypeDropdownOpen && (
                                            <motion.div 
                                                className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg border border-gray-200 shadow-lg z-10"
                                                variants={dropdownVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                            >
                                                <div 
                                                    className="px-3 py-2 hover:bg-gray-100 text-[#0A2F1E] cursor-pointer text-sm"
                                                    onClick={() => {
                                                        setPropertyType('All type');
                                                        setIsTypeDropdownOpen(false);
                                                    }}
                                                >
                                                    All type
                                                </div>
                                                {Object.entries(propertyTypes).map(([key, value]) => (
                                                    <motion.div 
                                                        key={key}
                                                        className="px-3 py-2 hover:bg-gray-100 text-[#0A2F1E] cursor-pointer text-sm"
                                                        whileHover={{ backgroundColor: "#f0f0f0" }}
                                                        onClick={() => {
                                                            setPropertyType(value);
                                                            setIsTypeDropdownOpen(false);
                                                        }}
                                                    >
                                                        {value}
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Location Input */}
                            <motion.div 
                                className="mb-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ 
                                    opacity: 1, 
                                    y: 0, 
                                    transition: { delay: 0.4 } 
                                }}
                            >
                                <label className="text-xs text-gray-500 mb-1 block text-left">Location</label>
                                <motion.div 
                                    className="flex items-center border border-gray-200 rounded-lg p-3"
                                    whileHover={{ borderColor: "#0A2F1E" }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Search Location"
                                        className="w-full outline-none text-sm text-[#0A2F1E] placeholder:text-[#0A2F1E]"
                                        value={location}
                                        onChange={(e) => handleLocationInput(e.target.value)}
                                    />
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Locate size={16} className="text-gray-500" />
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            {/* Advanced Search Link */}
                            <motion.div 
                                className="mb-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ 
                                    opacity: 1, 
                                    y: 0, 
                                    transition: { delay: 0.5 } 
                                }}
                            >
                                <motion.button 
                                    className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg p-3"
                                    whileHover={{ backgroundColor: "#f7f7f7" }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="text-sm text-gray-700">Advanced Search</span>
                                    <Sliders size={14} className="text-gray-700" />
                                </motion.button>
                            </motion.div>

                            {/* Search Button */}
                            <motion.button 
                                onClick={handleSearch}
                                className="w-full bg-[#0A2F1E] text-white flex items-center justify-center gap-2 rounded-lg p-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ 
                                    opacity: 1, 
                                    y: 0, 
                                    transition: { delay: 0.6 } 
                                }}
                                whileHover={{ scale: 1.02, backgroundColor: "#0D3B27" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Search</span>
                                <SearchIcon size={16} />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Search