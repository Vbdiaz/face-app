import React, { useRef, useState } from "react";

function Camera() {
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [processedImgSrc, setProcessedImgSrc] = useState(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch(err => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");

      fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: imageData })
      })
        .then(response => response.json())
        .then(data => {
          setProcessedImgSrc(data.image);
          console.log("Image processed successfully:", data);
        })
        .catch(error => {
          console.error("Error processing image:", error);
        });
    }
  };

  return (
    <div>
      <header className="text-center">
        <h1 className="z-10 text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-black-800 mb-4">
          Intelligent Predictions
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-roboto text-gray-600">
          Age, Gender & Gender Identity - CNN Powered Insights
        </p>
      </header>
    <div class="flex justify-center h-screen">
      <div class="relative w-60 h-80 overflow-hidden rounded-lg border-4 border-blue-500">
        <video id="webcam" ref={videoRef} class="w-full h-full object-cover"></video>
    </div>
    </div>
      
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      {processedImgSrc && (
        <div>
          <h2>Processed Image:</h2>
          <img src={processedImgSrc} alt="Processed" />
        </div>
      )}
    </div>
  );
}

export default Camera;