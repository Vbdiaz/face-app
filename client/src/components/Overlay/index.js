import React from "react";
import Scanner from '../Scanner';  // Import the Scanner component

const Overlay = ({ imageSrc, responseImg, faceData, onClose, isProcessing }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[calc(100vh-80px)] overflow-hidden">
        {/* Display the captured image */}
        <img
          src={responseImg || imageSrc}
          alt="Captured"
          className="w-full h-auto object-contain border-4 border-blue-500 rounded-lg"
        />

                
        {/* Conditionally render the Scanner animation on top */}
        {isProcessing && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Scanner />
            </div>
          </div>
        )}

        {/* Face data below the image */}
        {faceData && faceData.length > 0 && (
          <div className="w-full bg-black bg-opacity-60 text-white p-4">
            <ul>
              {faceData.map((face, index) => (
                <li key={index} className="mb-2">
                  <p className="font-bold">Face {index + 1}:</p>
                  <p>Emotion: {face.emotion}</p>
                  <p>Gender: {face.gender}</p>
                  <p>Age: {face.age}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <button
          className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded"
          onClick={onClose}
        >
          X Close
        </button>
      </div>
    </div>
  );
};

export default Overlay;
