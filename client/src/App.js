import React from "react";
import WebcamCapture from './components/Camera';
import './App.css'
import ParticlesComponent from './components/Particles';

function App() {
  return (
    <div className="app-container">
      <ParticlesComponent id="particles" />
      <header class="title">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-boldmb-4">
          CNN Face Recognition
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-roboto">
          Age, Emotion & Gender Predictor
        </p>
      </header>
      <WebcamCapture />
    </div>
  );
}

export default App;
