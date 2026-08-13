from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI(
    title="Heart Disease Prediction API",
    description="API for the heart disease ML prototype",
    version="1.0.0"
)

# Load the trained model
model = joblib.load("models/best_model.pkl")


@app.get("/")
def home():
    return {
        "message": "Heart Disease Prediction API is running"
    }


@app.post("/predict")
def predict(patient: dict):

    # Convert received patient data into a DataFrame
    data = pd.DataFrame([patient])

    # Make prediction
    prediction = model.predict(data)[0]

    # Get probability of class 1
    probability = model.predict_proba(data)[0, 1]

    return {
        "prediction": int(prediction),
        "probability": round(float(probability), 4)
    }