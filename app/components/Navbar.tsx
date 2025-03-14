'use client'

import { useState } from "react"
import { Menu, X, Copy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    const navItems = [
        { name: 'About', path: '/about' },
        { name: 'Properties', path: '/properties' },
        { name: 'Services', path: '/services' },
        { name: 'Media', path: '/media' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact Us', path: '/contact' }
    ];

  return (
    <header className="p-5 md:px-14 relative flex justify-between items-center">
        <Image
         src={'/images/logo.png'}
         alt="Logo"
         width={70}
         height={35}
        />

        {/* Sliding Menu */}
                <div className={`fixed top-0 right-0 h-full w-[280px] bg-white transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } z-50 shadow-2xl`}>
                    <div className='h-full flex flex-col'>
                        {/* Header */}
                        <div className='p-6 flex justify-between items-center border-b'>
                            <Link href='/'>
                            <Image
                              src={'/images/logo.png'}
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
                        <nav className=' overflow-y-auto'>
                            <ul className='py-4'>
                                {navItems.map((item, index) => (
                                    <li key={index}>
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
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            {/*Desktop Menu */}
            <nav className="hidden md:block">
                <ul className="flex gap-8 text-[14px]">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                             href={item.path}>
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <button className="md:flex flex-row-reverse text-white hidden bg-[#0A2F1E] px-5 py-2 rounded-full items-center gap-2 text-[13px]">
                Submit Property
                <Copy size={15} />
            </button>

        <Menu size={30} onClick={toggleMenu} className="text-[#0A2F1E] md:hidden" />
        
    </header>
  )
}

export default Navbar