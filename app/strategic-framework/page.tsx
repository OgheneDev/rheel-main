'use client';
import { useState } from 'react';

const StrategicFramework = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#161E2D] mb-6">Strategic Framework</h1>
        <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-200px)]">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2F1E]"></div>
            </div>
          )}
          <iframe
            src="/documents/strategic-framework.pdf"
            className="w-full h-full"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default StrategicFramework;
