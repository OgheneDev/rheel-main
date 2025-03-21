'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SendHorizonal } from 'lucide-react';

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
  }, [pathname]); // Re-run when pathname changes

  const handleNavigation = (pagePath: string, id: string): void => {
    if (pathname === pagePath) {
      // We're on the same page, just scroll to the element
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // We're on a different page, navigate and then scroll
      router.push(`${pagePath}#${id}`);
    }
  };

  return (
    <footer className="bg-[#0A2F1E] text-white">
      {/* Main Footer Area */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-8">
        {/* Top Section with Logo and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-6">
          <div className="mb-4 md:mb-0">
            <Image 
              src="/images/footer-logo.png" 
              alt="Rheel Estate Limited" 
              width={100} 
              height={45} 
              className="h-auto"
            />
          </div>
          
          <div className="flex gap-3  items-center">
            <p className="text-[12px]">Follow Us:</p>
            <div className="flex space-x-3">
              <Link href="https://www.facebook.com/rheelestateabuja" aria-label="Facebook" className="bg-[#FFFFFF1A] hover:bg-gray-700 p-2 rounded-full">
                <FaFacebookF className="text-white" />
              </Link>
              <Link href="https://twitter.com/rheel_estate" aria-label="Twitter" className="bg-[#FFFFFF1A] hover:bg-gray-700 p-2 rounded-full">
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
      </div>
        
      {/* Full-width divider */}
      <div className="w-full border-b border-gray-700"></div>
        
      {/* Middle Section with Info */}
      <div className="container mx-auto px-4 md:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-13 gap-5">
          {/* Company Description */}
          <div className="md:col-span-4">
            <p className="text-[12px] leading-relaxed mb-6 text-[#A3ABB0]">
              At Rheel Estate Limited, we provide comprehensive real 
              estate solutions designed to simplify property 
              transactions, maximize investment opportunities, and 
              ensure seamless property management.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 text-[#FFFFFF]">
              <div className="flex items-center text-[12px]">
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#A3ABB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4"></path> </svg>
                <span>CAC No: 7197447</span>
              </div>
              <div className="flex items-center text-[12px]">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#A3ABB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"></path>
                  <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"></path>
                </svg>
                <span>SCUML: 15183136</span>
              </div>
              <div className="flex items-start text-[12px]">
  <svg 
    className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#A3ABB0" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
  <span className="flex-1 leading-5">
    4th Floor, Churchgate Tower, Plot 473 Constitution Ave, Central Business Dis, Abuja Federal Capital Territory, Nigeria
  </span>
</div>
              <div className="flex items-center text-[12px]">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#A3ABB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>234(0)8099222223</span>
              </div>
              <div className="flex items-center text-[12px]">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#A3ABB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>hello@rheelestate.com</span>
              </div>
            </div>
          </div>
          
          {/* Categories Column - smaller width */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4 text-[13px]">Categories</h3>
            <ul className="space-y-2 text-[#A3ABB0]">
              <li><Link href="/about" className="text-[12px] hover:text-gray-300">About Us</Link></li>
              <li
                onClick={() => handleNavigation("/about", "mission")}
                className="text-[12px] cursor-pointer hover:text-gray-300"
              >
                Mission
              </li>
              <li
                onClick={() => handleNavigation("/about", "vision")}
                className="text-[12px] cursor-pointer hover:text-gray-300"
              >
                Vision
              </li>
              <li
                onClick={() => handleNavigation("/", "team")}
                className="text-[12px] cursor-pointer hover:text-gray-300"
              >
                The Team
              </li>
              <li><Link href="#" className="text-[12px] hover:text-gray-300">Corporate Profile</Link></li>
              <li><Link href="#" className="text-[12px] hover:text-gray-300">Strategic Framework</Link></li>
            </ul>
          </div>
          
          {/* Media Column - smaller width */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-[13px] mb-4">Media</h3>
            <ul className="space-y-2 text-[#A3ABB0]">
              <li><Link href="#" className="text-[12px] hover:text-gray-300">Press Release</Link></li>
              <li><Link href="#" className="text-[12px] hover:text-gray-300">Blogs</Link></li>
              <li><Link href="#" className="text-[12px] hover:text-gray-300">Events</Link></li>
              <li><Link href="#" className="text-[12px] hover:text-gray-300">Adverts</Link></li>
            </ul>
          </div>
          
          {/* Contact Column - smaller width */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-[13px] mb-4">Contact</h3>
            <ul className="space-y-2 text-[#A3ABB0]">
              <li><Link href="/contact" className="text-[12px] hover:text-gray-300">Contact Us</Link></li>
              <li><Link href="/affiliates" className="text-[12px] hover:text-gray-300">Affiliates</Link></li>
              <li><Link href="/careers" className="text-[12px] hover:text-gray-300">Career</Link></li>
              <li
                onClick={() => handleNavigation("/contact", "faq")}
                className="text-[12px] cursor-pointer hover:text-gray-300"
              >
                FAQ
              </li>
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div className="md:col-span-3">
            <h3 className="font-semibold text-[13px] mb-4">Newsletter</h3>
            <p className="text-[12px] mb-4 text-[#A3ABB0]">
              Stay up to date with new property alerts and bonuses from Rheel Estate
            </p>
            <div className="flex w-full">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-[#FFFFFF1A] text-white px-4 placeholder:text-[12px] py-2 rounded-l-full w-full text-sm focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-[#FFFFFF1A] rounded-r-full px-4 py-2 flex items-center justify-center"
              >
                <SendHorizonal className="text-[#1563DF] w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-width divider */}
      <div className="w-full border-t border-gray-700"></div>
      
      {/* Copyright Section */}
      <div className="py-4">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[12px] mb-2 md:mb-0 text-[#A3ABB0]">©2024 Rheel Estate Incorporation. All Rights Reserved.</p>
          <div className="flex space-x-6 text-[#A3ABB0]">
            <Link href="#" className="text-[12px]  hover:text-gray-300">Terms Of Services</Link>
            <Link href="#" className="text-[12px]  hover:text-gray-300">Privacy Policy</Link>
            <Link href="#" className="text-[12px]  hover:text-gray-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;