import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

const Camera = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [responseImg, setResponseImg] = useState(null);

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    console.log('Capture function triggered'); // Debugging line
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    sendImage(imageSrc);
  }, [webcamRef]);

  const sendImage = async (imageSrc) => {
    try {
<<<<<<< Updated upstream
      const response = await fetch('/upload', {
=======
      const response = await fetch('http://localhost:5000/upload', {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      <div className="flex justify-center">
        <div className="w-96 h-50 overflow-hidden rounded-lg border-4 border-blue-500">
=======
      <div className="flex justify-center mb-4">
        <div className="w-96 h-72 overflow-hidden rounded-lg border-4 border-blue-500">
>>>>>>> Stashed changes
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
<<<<<<< Updated upstream
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={() => { console.log('Button clicked'); capture(); }}
      >
=======
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <button className="bg-white border px-4 py-2 rounded" onClick={capture}>
>>>>>>> Stashed changes
        Capture photo
      </button>
      {responseImg && (
        <div className="flex justify-center mt-4">
          <img
            src={responseImg}
            alt="Processed"
<<<<<<< Updated upstream
            className="w-96 h-50 object-contain border-4 border-blue-500 rounded-lg"
=======
            className="w-96 h-auto border-4 border-blue-500 rounded-lg"
>>>>>>> Stashed changes
          />
        </div>
      )}
    </div>
  );
};

export default Camera;
