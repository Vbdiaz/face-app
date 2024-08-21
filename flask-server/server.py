from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import base64
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

app = Flask(__name__)
CORS(app)

# Load models
face_classifier = cv2.CascadeClassifier('C:/Users/vbdia/Spyder/Emotion detection/haarcascade_frontalface_default.xml')
emotion_model = load_model('C:/Users/vbdia/Spyder/Emotion detection/emotion_detection_model_100epochs.h5')
age_model = load_model('C:/Users/vbdia/Spyder/Emotion detection/age_model_50epochs.h5')
gender_model = load_model('C:/Users/vbdia/Spyder/Emotion detection/gender_model_50epochs.h5')

class_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']
gender_labels = ['Male', 'Female']

@app.route("/upload", methods=["POST"])
def upload_image():
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
        cv2.rectangle(img,(x,y),(x
                                 +w,y+h),(255,0,0),2)
        roi_gray = gray[y:y + h, x:x + w]
        roi_gray = cv2.resize(roi_gray, (48, 48))
        roi = roi_gray.astype('float') / 255.0
        roi = img_to_array(roi)
        roi = np.expand_dims(roi, axis=0)

        # Emotion prediction
        preds = emotion_model.predict(roi)[0]
        label = class_labels[preds.argmax()]
        cv2.putText(img, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Gender prediction
        roi_color = img[y:y + h, x:x + w]
        roi_color = cv2.resize(roi_color, (200, 200))
        gender_predict = gender_model.predict(np.array(roi_color).reshape(-1, 200, 200, 3))
        gender_predict = (gender_predict >= 0.5).astype(int)[:, 0]
        gender_label = gender_labels[gender_predict[0]]
        cv2.putText(img, gender_label, (x, y + h + 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Age prediction
        age_predict = age_model.predict(np.array(roi_color).reshape(-1, 200, 200, 3))
        age = round(age_predict[0, 0])
        cv2.putText(img, f"Age={age}", (x, y + h + 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # Convert back to PIL for response
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_pil = Image.fromarray(img)
    buffered = io.BytesIO()
    img_pil.save(buffered, format="JPEG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return jsonify({"image": f"data:image/jpeg;base64,{img_base64}"})

if __name__ == "__main__":
    app.run(debug=True)
