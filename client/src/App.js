import React from "react";
import WebcamCapture from './components/Camera';
import Info from './components/Info';
import './App.css';
import ParticlesComponent from './components/Particles';

function App() {
  return (
    <div className="app-container">
      <ParticlesComponent id="particles" />
      <header>
        <h1>CNN Face Recognition</h1>
        <p>Age, Emotion & Gender Predictor</p>
      </header>
      <div className="webcam-container">
        <WebcamCapture />
      </div>
      <div className="webcam-container">
        <Info/>
      </div>
    </div>
  );
}

export default App;
