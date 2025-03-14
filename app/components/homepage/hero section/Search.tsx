'use client'

import { useState } from "react"
import { ChevronDown, Search as SearchIcon, Sliders, Locate } from "lucide-react"

const Search = () => {
    const [activeTab, setActiveTab] = useState('For Sale');
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('All type');
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

    const propertyTypes = {
        1: 'Duplex', 2: 'Terrace', 3: 'Bungalow', 4: 'Apartments',
        5: 'Commercial', 6: 'Carcass', 7: 'Land', 8: 'JV Land',
    };

    return (
        <div>
            {/* For Lease/Sale buttons - your existing code */}
            <div className="flex items-center gap-5 justify-center mb-4">
                <button
                    className={`px-8 py-2 cursor-pointer rounded-full ${activeTab === 'For Lease' ? 'bg-[#0A2F1E] text-white' : 'bg-transparent border border-white'}`}
                    onClick={() => setActiveTab('For Lease')}
                >
                    For Lease
                </button>
                <button
                    className={`px-8 py-2 cursor-pointer rounded-full ${activeTab === 'For Sale' ? 'bg-[#0A2F1E] text-white' : 'bg-transparent border border-white'}`}
                    onClick={() => setActiveTab('For Sale')}
                >
                    For Sale
                </button>
            </div>

            {/* Search container */}
            <div className="bg-white rounded-full md:flex hidden  items-center shadow-md w-full max-w-5xl mx-auto h-16">
                {/* Type dropdown */}
                <div className="w-1/5 border-r border-gray-200 h-full px-6">
                    <div className="h-full flex flex-col justify-center relative" onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}>
                        <div className="text-xs text-gray-500 mb-1 text-left">Type</div>
                        <div className="flex items-center justify-between cursor-pointer w-full">
                            <span className="font-normal text-sm text-black">All type</span>
                            <ChevronDown size={16} className="text-gray-500" />
                        </div>
                        
                        {isTypeDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded border border-gray-200 shadow-lg z-10">
                                <div 
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
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
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPropertyType(value);
                                            setIsTypeDropdownOpen(false);
                                        }}
                                    >
                                        {value}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Location input */}
                <div className="w-2/5 border-r border-gray-200 h-full px-6">
                    <div className="h-full flex flex-col justify-center">
                        <div className="text-xs text-gray-500 mb-1 text-left">Location</div>
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                placeholder="Search Location"
                                className="w-full outline-none text-sm text-[#161E2D] placeholder:text-[#161E2D]"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <div className="w-6 h-6 flex items-center justify-center">
                            <Locate className='w-4 h-4' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search buttons */}
                <div className="w-2/5 px-4 flex items-center justify-end space-x-2">
                    {/* Advanced Search button */}
                    <button className="flex items-center rounded-full border border-gray-200 px-4 py-2 bg-white">
                        <span className="text-sm text-gray-700 mr-2">Search advanced</span>
                        <Sliders size={14} className="text-gray-700" />
                    </button>
                    
                    {/* Search button */}
                    <button className="bg-[#0A2F1E] text-white flex items-center gap-2 rounded-full px-6 py-2">
                        <span className="text-sm">Search</span>
                        <SearchIcon size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search