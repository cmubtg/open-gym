import sys
import json
import joblib

# Chat gpt solution

# Load the trained model
# Or replace with our own version
model = joblib.load('trained_model.joblib')

# Read input data from Node.js server
input_data = json.loads(sys.argv[1])

# Make predictions using the loaded model
prediction = model.predict([input_data])[0]

# Print the prediction (this output will be captured by the Node.js server)
print(prediction)