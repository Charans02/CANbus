# predictor.py
import pickle
import json
import numpy as np

# Load features from file
with open("temp_input.json", "r") as f:
    data = json.load(f)
    features = np.array(data["features"]).reshape(1, -1)

# Load model and preprocessing files
with open("models/scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

with open("models/svm_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("models/label_encoder.pkl", "rb") as f:
    encoder = pickle.load(f)

# Transform input
scaled = scaler.transform(features)

# Predict
pred = model.predict(scaled)
pred_label = encoder.inverse_transform(pred)[0]

# Output prediction
print(json.dumps({"prediction": pred_label}))
