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
    <div class="relative">
      <div class="flex justify-center h-screen">
        <div class="w-60 h-80 overflow-hidden rounded-lg border-4 border-blue-500">
          <video
            id="webcam"
            ref={videoRef}
            class="w-full h-full object-cover"
          ></video>
        </div>
      </div>

      <button onClick={startCamera} class='text-white'>
        Start Camera
      </button>
      <button class='text-white' onClick={captureImage}>Capture Image</button>
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