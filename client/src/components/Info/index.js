import React, { useState } from 'react';

const Info = () => {
  return (
    <div className="relative max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
            
            <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">How does it work?</h2>
            <p className="mt-2 text-gray-700"> Once you capture your image, it is processed in grayscale through a frontal face <strong>Haar Cascade Classifier</strong>. This classifier uses kernels to identify the coordinates of your face on the screen, allowing us to draw the blue square around your face that you see after scanning the image. Once we have detected your face, the frame is analyzed by three predictive models. Each model utilizes <strong>convolutional neural networks</strong>, trained on thousands of images, to provide predictions for emotion, age, and gender, which are displayed after capturing the picture.</p>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">What are Haar Cascade Classifiers?</h2>
            <img src="/img/haar.png" className="block mx-auto"></img>
            <p className="mt-2 text-gray-700">Haar cascade classifiers are a widely used object detection method introduced by Paul Viola and Michael Jones in 2001. This machine learning model is based on a large dataset of images, both with and without faces. The algorithm employs Haar features, which are patterns of white and black rectangles used to detect facial features. These features are applied to all training images, and the most effective features are selected for the final model. The classifier operates in a layered approach, where the image is processed through multiple stages with different features. If the image successfully passes through all stages, it indicates that a face has been identified.</p>
            <p className="mx-auto"> OpenCV. (n.d.). <em>Cascade classifier.</em> <a href="https://docs.opencv.org/3.4/db/d28/tutorial_cascade_classifier.html" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">https://docs.opencv.org/3.4/db/d28/tutorial...</a></p>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">What are Convolutional Neural Networks?</h2>
            <img src="/img/CNN.png" className="block mx-auto"></img>
            <p className="mt-2 text-gray-700">Convolutional Neural Networks are a specialized type of neural network designed to process structured grid data, such as images. They achieve this through convolutional layers, where a set of kernels (small matrices) is applied to the input image. These kernels scan the image, detecting features like edges and corners by analyzing differences in color intensities of each pixel. After each convolutional layer, an activation function, typically ReLU, is applied to introduce non-linearity.Next, a pooling layer reduces the dimensionality of the feature maps, summarizing the features and reducing computational requirements. CNNs often stack multiple convolutional and pooling layers to capture increasingly abstract features like faces and eyes. Finally, a fully connected, or dense, layer flattens the output of these layers into a single vector. This vector, which combines all the detected features, is passed through an output layer, to make the final prediction.</p>
            <p className="mx-auto">GeeksforGeeks. (2024, March 14). <em>Introduction to convolution neural network. </em><a href="https://www.geeksforgeeks.org/introduction-convolution-neural-network/" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">https://www.geeksforgeeks.org/introduction-convolution-neural-network/</a></p>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Credits</h2>
            <p className="mt-2 text-gray-700">I would like to give a special thanks to DigitalScreeni whose tutorial videos I followed and were extremely helpful to understand these concepts and allowed me to train the models locally.</p>
            <p className="mx-auto">DigitalScreeni. (n.d.) <em>Home</em> [Youtube channel]. Youtube. Retrieved August 28, 2024, from <a href="https://www.youtube.com/@DigitalSreeni" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">https://www.youtube.com/@DigitalSreeni</a></p>
            </div>
        </div>
    </div>
  );
};

export default Info;
