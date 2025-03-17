'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Effect to handle hash fragments after navigation
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (hash) {
      // Remove the # character
      const id = hash.substring(1);
      // Wait for the DOM to be fully loaded
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname]); // Re-run when pathname or search params change

  const handleNavigation = (pagePath: string, id: string): void => {
    if (pathname === pagePath) {
      // We're on the same page, just scroll to the element
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // We're on a different page, navigate and then scroll
      // The useEffect above will handle the scrolling after navigation
      router.push(`${pagePath}#${id}`);
    }
  };

  return (
    <footer className="bg-[#0A2F1E] text-white">
      {/* Main Footer Area */}
      <div className="container mx-auto px-4 md:px-[130px] pt-8 pb-4">
        {/* Top Section with Logo and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          <div className="mb-4 md:mb-0">
            <Image 
              src="/images/footer-logo.png" 
              alt="Rheel Estate Limited" 
              width={100} 
              height={100} 
              className="h-auto"
            />
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="mb-2">Follow Us:</p>
            <div className="flex space-x-3">
              <Link href="https://www.facebook.com/rheelestateabuja" aria-label="Facebook" className="bg-[#FFFFFF1A] hover:bg-gray-700 p-2 rounded-full">
                <FaFacebookF className="text-white" />
              </Link>
              <Link href="https://www.twitter.com/rheel_estate" aria-label="Twitter" className="bg-[#FFFFFF1A] hover:bg-gray-700 p-2 rounded-full">
                <FaTwitter className="text-white" />
              </Link>
              <Link href="https://www.instagram.com/rheel_estate" aria-label="Instagram" className="bg-[#FFFFFF1A] hover:bg-gray-700 p-2 rounded-full">
                <FaInstagram className="text-white" />
              </Link>
              <Link href="https://www.youtube.com/@rheelestate" aria-label="YouTube" className="bg-[#FFFFFF1A] hover:bg-gray-700 p-2 rounded-full">
                <FaYoutube className="text-white" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Middle Section with Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-8">
          {/* Company Description */}
          <div className="lg:col-span-1">
            <p className="text-sm leading-relaxed mb-4 text-[#A3ABB0]">
              At Rheel Estate Limited, we provide comprehensive real 
              estate solutions designed to simplify property 
              transactions, maximize investment opportunities, and 
              ensure seamless property management.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="mr-2">CAC No: 7197447</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2">SCUML: 151831336</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2">Churchgate tower, CBD, Abuja</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2">+234(0)8099222223</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2">hello@rheelestate.com</span>
              </div>
            </div>
          </div>
          
          {/* Categories Column */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-[#A3ABB0]">
              <li><Link href="/about" className="text-sm hover:text-gray-300">About Us</Link></li>
              <li
                onClick={() => handleNavigation("/about", "mission")}
                className="text-sm cursor-pointer hover:text-gray-300"
              >
                Mission
              </li>
              <li
                onClick={() => handleNavigation("/about", "vision")}
                className="text-sm cursor-pointer hover:text-gray-300"
              >
                Vision
              </li>
              <li
                onClick={() => handleNavigation("/", "team")}
                className="text-sm cursor-pointer hover:text-gray-300"
              >
                The Team
              </li>
              <li><Link href="#" className="text-sm hover:text-gray-300">Corporate Profile</Link></li>
              <li><Link href="#" className="text-sm hover:text-gray-300">Strategic Framework</Link></li>
            </ul>
          </div>
          
          {/* Media Column */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Media</h3>
            <ul className="space-y-2 text-[#A3ABB0]">
              <li><Link href="#" className="text-sm hover:text-gray-300">Press Release</Link></li>
              <li><Link href="#" className="text-sm hover:text-gray-300">Blogs</Link></li>
              <li><Link href="#" className="text-sm hover:text-gray-300">Events</Link></li>
              <li><Link href="#" className="text-sm hover:text-gray-300">Adverts</Link></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-[#A3ABB0]">
              <li><Link href="/contact" className="text-sm hover:text-gray-300">Contact Us</Link></li>
              <li><Link href="/affiliates" className="text-sm hover:text-gray-300">Affiliates</Link></li>
              <li><Link href="/careers" className="text-sm hover:text-gray-300">Career</Link></li>
              <li
                onClick={() => handleNavigation("/contact", "faq")}
                className="text-sm cursor-pointer hover:text-gray-300"
              >
                FAQ
              </li>
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm mb-4 text-[#A3ABB0]">
              Stay up to date with new property alerts and bonuses from Rheel Estate
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-[#FFFFFF1A] text-white px-4 placeholder:text-[12px] py-2 rounded-l-full w-full text-sm"
              />
              <button 
                type="submit" 
                className="bg-[#FFFFFF1A] rounded-r-full px-4 py-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="border-t border-gray-700 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-2 md:mb-0 text-[#A3ABB0]">©2024 Rheel Estate Incorporation. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm hover:text-gray-300">Terms Of Services</Link>
            <Link href="#" className="text-sm hover:text-gray-300">Privacy Policy</Link>
            <Link href="#" className="text-sm hover:text-gray-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;