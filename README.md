# face-app

# Project Name

This repository contains two main parts: a Node.js React client and a Python Flask server. Follow the steps below to set up and run the project locally.

## Table of Contents

- [Installation](#installation)
  - [Setting Up the React Client](#setting-up-the-react-client)
  - [Setting Up the Flask Server](#setting-up-the-flask-server)
- [Model Training and Datasets](#model-training-and-datasets)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Setting Up the React Client

1. **Navigate to the client directory**:
    ```bash
    cd client
    ```

2. **Install the required dependencies using node 20.16.0+**:
    ```bash
    npm install
    ```

3. **Start the React client**:
    ```bash
    npm start
    ```

### Setting Up the Flask Server

1. **Navigate to the Flask server directory**:
    ```bash
    cd flask-server
    ```

2. **Create a virtual environment using Python 3.9+**:
    ```bash
    python3 -m venv venv
    ```

3. **Activate the virtual environment**:

    - **On Windows**:
        ```bash
        venv\Scripts\activate
        ```
    - **On macOS and Linux**:
        ```bash
        source venv/bin/activate
        ```

4. **Install the required Python packages**:
    ```bash
    pip install -r requirements.txt
    ```

5. **Start the Flask server**:
    ```bash
    flask run
    ```

## Model Training and Datasets

In the `flask-server` directory, there is a `models` folder that contains:

- **Python scripts**: These scripts were used to train the CNN models for age, gender, and emotion detection.
- **Saved models**: Pre-trained models that can be used directly in the application.

### Datasets

The models were trained using the following datasets:

- **Age and Gender**: [UTK Face Dataset](https://susanqq.github.io/UTKFace/)
- **Emotion Detection**: [FER-2013 Dataset](https://www.kaggle.com/datasets/msambare/fer2013)
- **Face Detection**: Pretrained Haar cascade classifiers from OpenCV. You can find the frontal face Haar cascade classifier [here](https://github.com/opencv/opencv/blob/master/data/haarcascades/haarcascade_frontalface_default.xml).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


# This READE.md file was written with ChatGPT for practical purposes.
