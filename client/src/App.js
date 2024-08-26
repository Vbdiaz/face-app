import React from "react";
import WebcamCapture from './components/Camera';
import './App.css'
import ParticlesComponent from './components/Particles';

function App() {
  return (
    <div className="app-container">
      <ParticlesComponent id="particles" />
      <header className="title">
        <h1 className="md:text-3xl lg:text-6xl text-xl font-playfair font-boldmb-4">
          CNN Face Recognition
        </h1>
        <p className="sm:text-xs md:text-2xl lg:text-3xl font-roboto">
          Age, Emotion & Gender Predictor
        </p>
      </header>
      <WebcamCapture />
    </div>
  );
}

export default App;
