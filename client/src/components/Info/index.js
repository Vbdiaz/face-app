import React, { useState } from 'react';

const Info = () => {
  const [language, setLanguage] = useState('english');

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'spanish' : 'english');
  };

  const content = {
    english: {
      howItWorks: "How does it work?",
      haarCascade: "What are Haar Cascade Classifiers?",
      cnn: "What are CNN?",
      credits: "Credits",
      howItWorksText: "Your detailed explanation on how the program works goes here.",
      haarCascadeText: "Information about Haar Cascade Classifiers.",
      cnnText: "Explanation about Convolutional Neural Networks.",
      creditsText: "Credits to the tutorials or resources you followed."
    },
    spanish: {
      howItWorks: "¿Cómo funciona?",
      haarCascade: "¿Qué son los clasificadores en cascada de Haar?",
      cnn: "¿Qué son las redes neuronales convolucionales (CNN)?",
      credits: "Créditos",
      howItWorksText: "Tu explicación detallada de cómo funciona el programa va aquí.",
      haarCascadeText: "Información sobre los clasificadores en cascada de Haar.",
      cnnText: "Explicación sobre las redes neuronales convolucionales.",
      creditsText: "Créditos a los tutoriales o recursos que seguiste."
    }
  };

  const currentContent = content[language];

  return (
    <div className="relative max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
            
            <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{currentContent.howItWorks}</h2>
            <p className="mt-2 text-gray-700">{currentContent.howItWorksText}</p>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{currentContent.haarCascade}</h2>
            <p className="mt-2 text-gray-700">{currentContent.haarCascadeText}</p>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{currentContent.cnn}</h2>
            <p className="mt-2 text-gray-700">{currentContent.cnnText}</p>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{currentContent.credits}</h2>
            <p className="mt-2 text-gray-700">{currentContent.creditsText}</p>
            <button
            onClick={toggleLanguage}
            className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
            {language === 'english' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
            </button>
            </div>
        </div>
        </div>

  );
};

export default Info;
