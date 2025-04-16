'use client';

import React, { useState, useEffect, useMemo } from 'react';
import CareerCard from './CareerCard';
import CareerFilters from './CareerFilters';
import { getCareers } from '../../services/careers';
import { Career } from '@/app/types';
import CareerSkeleton from './CareerSkeleton';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type SortOption = 'default' | 'salary-asc' | 'salary-desc' | 'date';

const CareersList: React.FC = () => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>("default"); // Instead of <SortOption>
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const data: Career[] = await getCareers();
                setCareers(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchCareers();
    }, []);

    const sortedCareers = useMemo(() => {
        if (sortBy === 'default') return careers;
    
        return [...careers].sort((a, b) => {
            switch (sortBy) {
                case 'salary_low':
                    return a.salary - b.salary;
                case 'salary_high':
                    return b.salary - a.salary;
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'location':
                    return a.location.localeCompare(b.location);
                default:
                    return 0;
            }
        });
    }, [careers, sortBy]);
    

    const itemsPerPage = 6;
    const totalPages = Math.ceil(sortedCareers.length / itemsPerPage);
    const currentCareers = sortedCareers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-7">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
                <CareerSkeleton key={index} />
            ))}
        </div>
    );

    if (error) return <div>Error: {error}</div>;

    if (!careers || careers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <h3 className="text-xl font-semibold text-[#161E2D] mb-2">No Career Openings</h3>
                <p className="text-[#5C6368] text-center max-w-md">
                    There are currently no career opportunities available. Please check back later or follow us on social media for updates.
                </p>
            </div>
        );
    }

    return (
        <div> 
            <div className=" py-8">
                <CareerFilters 
                    sortBy={sortBy} 
                    setSortBy={setSortBy} 
                    isDropdownOpen={isDropdownOpen} 
                    setIsDropdownOpen={setIsDropdownOpen} 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-7">
                    {loading ? (
                        Array.from({ length: itemsPerPage }).map((_, index) => (
                            <CareerSkeleton key={index} />
                        ))
                    ) : (
                        currentCareers.map((career) => (
                            <CareerCard key={career.id} career={career} />
                        ))
                    )}
                </div>

                {totalPages > 1 && !loading && (
                    <div className="flex justify-center items-center gap-2 mt-10">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded-md transition-all ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#104438] text-white hover:bg-[#0c3a30]'}`}
                        >
                            <ArrowLeft size={20} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-[#104438] text-white' : 'bg-[#EDEFF6] text-[#104438] hover:bg-[#d6e2e1]'}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded-md transition-all ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#104438] text-white hover:bg-[#0d3e30]'}`}
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareersList;