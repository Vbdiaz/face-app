import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user", // This will use the selfie camera on mobile devices, or the front-facing camera on laptops
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  return (
    <div class='relative'>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button onClick={capture} class='text-white'>Capture photo</button>
      {imageSrc && (
        <div>
          <h3 class='text-white'>Captured Image:</h3>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
