'use client'
import { useState } from "react"

const Search = () => {
    const [activeTab, setActiveTab] = useState('For Sale');
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');

    const propertyTypes = {
        1: 'Duplex', 2: 'Terrace', 3: 'Bungalow', 4: 'Apartments',
        5: 'Commercial', 6: 'Carcass', 7: 'Land', 8: 'JV Land',
    };


  return (
    <div>
        <div className="flex items-center gap-5 justify-center">
            <button
             className={`px-8 py-2 rounded-full ${activeTab === 'For Lease' ? 'bg-[#0A2F1E] text-white' : 'bg-transparent border border-white'}`}
             onClick={() => setActiveTab('For Lease')}
            >
                For Lease
            </button>
            <button
                className={`px-8 py-2 rounded-full ${activeTab === 'For Sale' ? 'bg-[#0A2F1E] text-white' : 'bg-transparent border border-white'}`}
                onClick={() => setActiveTab('For Sale')}
            >
                For Sale
            </button>
        </div>
    </div>
  )
}

export default Search