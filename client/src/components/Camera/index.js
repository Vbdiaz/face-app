import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

const Camera = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [responseImg, setResponseImg] = useState(null);

  const videoConstraints = {
    facingMode: "user", // Use selfie camera or front camera
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    sendImage(imageSrc);
  }, [webcamRef]);

  const sendImage = async (imageSrc) => {
    try {
      const response = await fetch('http://server-face-app.vercel.app/upload', {
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
      <div class="flex justify-center h-screen">
        <div class="w-60 h-80 overflow-hidden rounded-lg border-4 border-blue-500">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          class="w-full h-full object-cover"
        />
        </div>
      </div>
      <button onClick={capture}>Capture photo</button>
      {imageSrc && (
        <div>
          <h3>Captured Image:</h3>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
      {responseImg && (
        <div>
          <h3>Processed Image:</h3>
          <img src={responseImg} alt="Processed" />
        </div>
      )}
    </div>
  );
};

export default Camera;