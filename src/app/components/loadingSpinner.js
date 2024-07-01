import React from 'react';

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-700 bg-opacity-50 z-50">
    <div className="flex flex-col items-center">
      <div className="loader"></div>
      <div className="mt-4 text-white">Loading...</div>
    </div>
    <style jsx>{`
      .loader {
        border: 8px solid #f3f3f3;
        border-radius: 50%;
        border-top: 8px solid #3498db;
        width: 60px;
        height: 60px;
        animation: spin 2s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default LoadingSpinner;
