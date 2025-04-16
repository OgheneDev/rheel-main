import React from 'react';
import { MapPin, Ribbon, ArrowRight } from 'lucide-react';
import { Career } from '@/app/types';

interface CareerCardProps {
    career: Career;
}

const CareerCard: React.FC<CareerCardProps> = ({ career }) => {
    const formatSalary = (salary: number): string => {
        return new Intl.NumberFormat('en-NG', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(salary);
    };

    return (
        <div className="flex flex-col justify-between p-6 rounded-lg shadow-md bg-white">
            <div className="flex flex-wrap justify-between mb-4">
                <span className="bg-[#207DFF] text-white px-4 py-2 rounded-md text-sm font-medium">
                    {career.position}
                </span>
                <span className={`px-4 py-2 rounded-md text-sm font-medium ${
                    career.type === 'Full-time' 
                        ? 'bg-[#0A2F1E] text-white' 
                        : 'bg-[#0A2F1E] text-white'
                }`}>
                    {career.type}
                </span>
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-900">{career.title}</h3>

            <p className=" mb-4 break-words">
                {career.description}
            </p>

            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-[#000000]">
                    <MapPin size={18} className="text-[#000000]" />
                    <span>{career.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#000000]">
                    <Ribbon size={18} className="text-[#000000]" />
                    <span>₦{formatSalary(career.salary)}</span>
                </div>
            </div>

            <div className="border-t border-[#000000] pt-4">
                <a 
                    href={career.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center ml-auto text-[#000000] cursor-pointer gap-2 hover:text-[#207DFF] transition-colors"
                >
                    Learn More <ArrowRight size={20} />
                </a>
            </div>
        </div>
    );
};

export default CareerCard;

