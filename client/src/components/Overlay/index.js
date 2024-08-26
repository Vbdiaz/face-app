import React from "react";
import Scanner from '../Scanner';  // Import the Scanner component

const Overlay = ({ imageSrc, responseImg, onClose, isProcessing }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative">
        {/* Display the captured image */}
        <img
          src={responseImg || imageSrc}
          alt="Captured"
          className="w-96 h-auto object-contain border-4 border-blue-500 rounded-lg"
        />
        
        {/* Conditionally render the Scanner animation on top */}
        {isProcessing && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Scanner />
            </div>
          </div>
        )}
        
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Overlay;
