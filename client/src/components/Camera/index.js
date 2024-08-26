import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

const Camera = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [responseImg, setResponseImg] = useState(null);

  const videoConstraints = {
    width: 1920, // Increase width
    height: 1080, // Increase height
    facingMode: "user", // Use selfie camera or front camera
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    sendImage(imageSrc);
  }, [webcamRef]);

  const sendImage = async (imageSrc) => {
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageSrc }),
      });
      const data = await response.json();
      setResponseImg(data.image);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-center">
        <div className="w-96 h-64 overflow-hidden rounded-lg border-4 border-blue-500">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            className="w-full h-full object-contain" // Adjusted for better fit
          />
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" onClick={capture}>
        Capture photo
      </button>
      {responseImg && (
        <div className="flex justify-center mt-4">
          <img
            src={responseImg}
            alt="Processed"
            className="w-96 h-64 object-contain border-4 border-blue-500 rounded-lg" // Adjusted for better fit
          />
        </div>
      )}
    </div>
  );
};

export default Camera;
