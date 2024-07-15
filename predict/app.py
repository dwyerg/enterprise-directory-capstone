from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Load the model from disk
with open('linreg.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/api/predict', methods=['POST'])
def predict():
    # Get the request data
    data = request.get_json(force=True)
    df = pd.DataFrame([data])

    categorical_cols = ['role', 'location']
    training_categories = {
    'location': ['Boston', 'Hartford', 'New York', 'Remote', 'St Paul'],
    'role': ['Data Engineer', 'Data Scientist', 'Finance Liason', 'Human Resources', 'Product Manager', 'Sales Associate', 'Scrum Master', 'Software Engineer']
    }

    for col in categorical_cols:
        categories = training_categories[col]
        df[col] = df[col].astype(pd.CategoricalDtype(categories=categories))

    df_encoded = pd.get_dummies(df, columns=categorical_cols)

    # Make a prediction
    prediction = model.predict(df_encoded)

    # Return the prediction
    return jsonify(prediction.tolist())

if __name__ == '__main__':
    app.run(port=5000)