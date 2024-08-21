import React, { useRef, useState } from "react";

function App() {
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
      <h1>Capture and Process a Picture</h1>
      <video ref={videoRef} width="640" height="480" />
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

export default App;
