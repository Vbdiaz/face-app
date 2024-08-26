import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import Overlay from '../Overlay';  // Import the Overlay component

const Camera = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [responseImg, setResponseImg] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const videoConstraints = {
    width: 1280,  // Adjusted width
    height: 720,  // Adjusted height
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
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!isOverlayOpen && (
        <div className="relative max-w-full max-h-full flex flex-col items-center justify-center">
          <div className="w-full max-w-lg max-h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              className="w-auto object-contain rounded-lg border-4 border-blue-500"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
            onClick={capture}
          >
            Capture photo
          </button>
        </div>
      )}
      {isOverlayOpen && (
        <Overlay
          imageSrc={imageSrc}
          responseImg={responseImg}
          onClose={handleCloseOverlay}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default Camera;

