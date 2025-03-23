'use client';
import { useState } from 'react';

const StrategicFramework = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#161E2D] mb-6">Strategic Framework</h1>
        <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-200px)] relative">
          {isLoading && (
            <div className="flex items-center justify-center absolute inset-0 bg-white z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2F1E]"></div>
            </div>
          )}
          <iframe
            src="/documents/strategic-framework.pdf"
            className="w-full h-full"
            onLoad={() => setIsLoading(false)}
            style={{
              WebkitOverflowScrolling: 'touch', // Enable momentum scrolling on iOS
              overflow: 'auto', // Ensure scrolling is enabled
              width: '100%',
              height: '100%',
            }}
            title="Strategic Framework PDF"
            allowFullScreen // Enable fullscreen mode
          />
          
          {/* Download button for mobile users */}
          <div className="md:hidden mt-4">
            <a 
              href="/documents/strategic-framework.pdf" 
              download
              className="block w-full text-center bg-[#0A2F1E] text-white py-2 rounded-full text-sm"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicFramework;
