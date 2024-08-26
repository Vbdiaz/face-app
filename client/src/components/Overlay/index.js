import React from "react";
import Scanner from '../Scanner';  // Import the Scanner component

const Overlay = ({ imageSrc, responseImg, onClose, isProcessing }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-full max-h-full flex flex-col items-center justify-center">
        {/* Display the captured image */}
        <img
          src={responseImg || imageSrc}
          alt="Captured"
          className="w-full sm:w-80 md:w-96 lg:w-1/2 xl:w-1/3 h-auto object-contain border-4 border-blue-500 rounded-lg"
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
