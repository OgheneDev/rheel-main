'use client';
import { useState, useEffect, useRef } from 'react';

const StrategicFramework = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  // Verify PDF exists on component mount
  useEffect(() => {
    const checkPdfExists = async () => {
      try {
        const response = await fetch('/documents/strategic-framework.pdf', { method: 'HEAD' });
        if (!response.ok) {
          setError(true);
        }
      } catch (e) {
        setError(true);
      }
    };
    
    checkPdfExists();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#161E2D] mb-6">Strategic Framework</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-200px)] relative">
          <div ref={pdfContainerRef} className="pdf-container w-full h-full">
            {isLoading && (
              <div className="flex items-center justify-center absolute inset-0 bg-white z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2F1E]"></div>
              </div>
            )}
            
            {error ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-red-500 mb-4">Unable to load the PDF preview.</p>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : (
              <object
                data="/documents/strategic-framework.pdf"
                type="application/pdf"
                className="w-full h-full"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setError(true);
                }}
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <p className="mb-4">Your browser doesn't support embedded PDF viewing.</p>
                  <div 
                    className="bg-blue-400 text-white px-6 py-3 rounded-full cursor-pointer"
                    onClick={() => {
                      if (pdfContainerRef.current) {
                        pdfContainerRef.current.innerHTML = '';
                        const iframe = document.createElement('iframe');
                        iframe.src = "/documents/strategic-framework.pdf";
                        iframe.className = "w-full h-full";
                        iframe.style.border = "none";
                        pdfContainerRef.current.appendChild(iframe);
                      }
                    }}
                  >
                    View PDF
                  </div>
                </div>
              </object>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500 text-center">
          This document is for preview purposes only. No download option is available.
        </div>
      </div>
    </div>
  );
};

export default StrategicFramework;