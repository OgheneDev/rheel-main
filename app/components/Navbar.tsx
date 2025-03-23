'use client'

import { useState } from "react"
import { Menu, X, Copy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import RequestListingModal from './general/RequestListingModal';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname()
    const router = useRouter()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    const scrollToProperties = () => {
        if (pathname === '/') {
            // If already on homepage, just scroll
            const propertiesSection = document.getElementById('properties-section')
            if (propertiesSection) {
                propertiesSection.scrollIntoView({ behavior: 'smooth' })
                setIsMenuOpen(false)
            }
        } else {
            // If on another page, navigate to homepage with a hash
            router.push('/#properties-section')
            setIsMenuOpen(false)
        }
    }

    const navItems = [
        { name: 'Home', path: '/'},
        { name: 'About', path: '/about' },
        { name: 'Properties', path: '#', onClick: scrollToProperties },
        { name: 'Services', path: '/services' },
        { name: 'Media', path: '/media' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact Us', path: '/contact' }
    ];

  return (
    <header className="p-5 md:px-14  relative flex justify-between items-center">
        <Link href='/'>
            <Image
                src={'/images/rheelblack.png'}
                alt="Logo"
                width={70}
                height={35}
                className="cursor-pointer w-auto h-auto"
            />
        </Link>

        {/* Sliding Menu */}
        <div className={`fixed top-0 right-0 h-full w-[280px] bg-white transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50 shadow-2xl`}>
            <div className='h-full flex flex-col'>
                {/* Header */}
                <div className='p-6 flex justify-between items-center border-b'>
                    <Link href='/' onClick={toggleMenu}>
                        <Image
                            src={'/images/rheelblack.png'}
                            alt="Logo"
                            width={50}
                            height={35}
                        />
                    </Link>
                    <button onClick={toggleMenu} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                        <X size='24' />
                    </button>
                </div>

                {/* Navigation */}
                <nav className='overflow-y-auto flex-grow'>
                    <ul className='py-4'>
                        {navItems.map((item, index) => (
                            <li key={index}>
                                {item.onClick ? (
                                    <button
                                        onClick={item.onClick}
                                        className="w-full text-left cursor-pointer flex items-center px-6 py-4 text-gray-700 border-b border-gray-100 transition-colors hover:bg-gray-50 hover:text-[#DB2626]"
                                    >
                                        <span className='text-[15px] font-medium'>{item.name}</span>
                                    </button>
                                ) : (
                                    <Link
                                        href={item.path}
                                        onClick={toggleMenu}
                                        className={`flex items-center px-6 py-4 text-gray-700 border-b border-gray-100 transition-colors ${
                                            pathname === item.path
                                                ? 'text-[#DB2626] bg-gray-50'
                                                : 'hover:bg-gray-50 hover:text-[#DB2626]'
                                        }`}
                                    >
                                        <span className='text-[15px] font-medium'>{item.name}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Add Request Listing Button to Mobile Menu */}
                <div className="p-6 border-t">
                    <button 
                        onClick={() => {
                            setIsModalOpen(true);
                            setIsMenuOpen(false);
                        }}
                        className="w-full flex justify-center items-center gap-2 bg-[#0A2F1E] text-white py-3 rounded-full text-sm"
                    >
                        Request Listing
                        <Copy size={13} />
                    </button>
                </div>
            </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
            <ul className="flex items-center md:gap-5 lg:gap-16 text-sm">
                {navItems.map((item, index) => (
                    <li key={index}>
                        {item.onClick ? (
                            <button onClick={item.onClick} className=" cursor-pointer">
                                <span>{item.name}</span>
                            </button>
                        ) : (
                            <Link href={item.path}>
                                <span>{item.name}</span>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>

        <button 
            onClick={() => setIsModalOpen(true)} 
            className="md:flex flex-row-reverse cursor-pointer text-white hidden bg-[#0A2F1E] px-5 py-3 rounded-full items-center gap-2 text-[12px]"
        >
            Request Listing
            <Copy size={13} />
        </button>

        <RequestListingModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />

        <Menu size={30} onClick={toggleMenu} className="text-[#0A2F1E] md:hidden" />

        {/* Overlay */}
        {isMenuOpen && (
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                onClick={toggleMenu}
            />
        )}
    </header>
  )
}

export default Navbar
