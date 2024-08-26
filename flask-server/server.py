from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore
from PIL import Image
import io
import base64
from keras.models import load_model # type: ignore
from keras.losses import MeanSquaredError # type: ignore
from tensorflow.keras.utils import img_to_array # type: ignore
import cv2
import numpy as np
app = Flask(__name__)
CORS(app)
# Load the Haar Cascade Classifier
face_classifier = cv2.CascadeClassifier('../haarcascade_frontalface_default.xml')

# Load the models with custom objects specified
emotion_model = load_model('../emotion_detection_model_100epochs.h5')
age_model = load_model('../age_model_50epochs.h5', custom_objects={'mse': MeanSquaredError()})
gender_model = load_model('../gender_model_50epochs.h5')

# Define labels
class_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']
gender_labels = ['Male', 'Female']

@app.route("/")
def home():
    return "Hello World, from Flask!"

@app.route("/upload", methods=["POST"])
def upload():
    data = request.get_json()
    image_data = data.get("image")

    # Decode base64 image data
    header, encoded = image_data.split(",", 1)
    binary_data = base64.b64decode(encoded)
    image = Image.open(io.BytesIO(binary_data))

    # Convert to OpenCV format
    img = np.array(image)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_classifier.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)

        # Prepare the image for emotion prediction
        roi = roi_gray.astype('float') / 255.0
        roi = img_to_array(roi)
        roi = np.expand_dims(roi, axis=0)

        preds = emotion_model.predict(roi)[0]
        label = class_labels[preds.argmax()]
        label_position = (x, y)
        cv2.putText(img, label, label_position, cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 1)

        # Gender prediction
        roi_color = img[y:y+h, x:x+w]
        roi_color = cv2.resize(roi_color, (200, 200), interpolation=cv2.INTER_AREA)
        gender_predict = gender_model.predict(np.array(roi_color).reshape(-1, 200, 200, 3))
        gender_predict = (gender_predict >= 0.5).astype(int)[:, 0]
        gender_label = gender_labels[gender_predict[0]]
        gender_label_position = (x, y+h)
        cv2.putText(img, gender_label, gender_label_position, cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 1)

        # Age prediction
        age_predict = age_model.predict(np.array(roi_color).reshape(-1, 200, 200, 3))
        age = round(age_predict[0, 0])
        age_label_position = (x+h, y+h)
        cv2.putText(img, "Age=" + str(age), age_label_position, cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 1)

    # Convert back to RGB and PIL for response
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_pil = Image.fromarray(img)
    buffered = io.BytesIO()
    img_pil.save(buffered, format="PNG", quality=95)  # Save with high quality
    img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return jsonify({"image": f"data:image/png;base64,{img_base64}"})

if __name__ == "__main__":
    app.run(debug=True)