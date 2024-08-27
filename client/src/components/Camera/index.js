import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import Overlay from '../Overlay';  // Import the Overlay component

const Camera = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [responseImg, setResponseImg] = useState(null);
  const [faceData, setFaceData] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setIsOverlayOpen(true);
    setIsProcessing(true);  // Show processing state and start the animation
    sendImage(imageSrc);
  }, [webcamRef]);

  const sendImage = async (imageSrc) => {
    try {
      const response = await fetch('/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageSrc }),
      });
      const data = await response.json();

      // Delay the display of the processed image for 5 seconds
      setTimeout(() => {
        setResponseImg(data.image);
        setFaceData(data.data);
        setIsProcessing(false);  // Stop showing the scanner animation
      }, 5000);
      
    } catch (error) {
      console.error('Error:', error);
      setIsProcessing(false);  // Stop the scanner in case of an error
    }
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setResponseImg(null);
    setFaceData(null);  // Clear faceData when the overlay is closed
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!isOverlayOpen && (
        <div className="relative w-full flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              className="w-full h-full object-contain rounded-lg border-4 border-blue-500 transform scale-x-[-1]"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
            onClick={capture}
          >
            Capture Photo
          </button>
        </div>
      )}
      {isOverlayOpen && (
        <Overlay
          imageSrc={imageSrc}
          responseImg={responseImg}
          faceData={faceData}
          onClose={handleCloseOverlay}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default Camera;
