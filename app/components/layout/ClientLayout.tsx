'use client'
import Navbar from '../Navbar';
import Footer from '../Footer';
import ContactPopup from '../general/ContactPopup';
import { useEffect, useState } from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const [showPopup, setShowPopup] = useState(false);
    const [isReturningUser, setIsReturningUser] = useState(false);
  
    useEffect(() => {
      const hasShownPopup = localStorage.getItem('hasShownPopup');
      
      if (hasShownPopup) {
        setIsReturningUser(true);
        setShowPopup(true);
        return;
      }
  
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem('hasShownPopup', 'true');
      }, 5000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <>
        <Navbar />
        {children}
        <Footer />
        <ContactPopup 
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          defaultMinimized={isReturningUser}
        />
      </>
    );
  }