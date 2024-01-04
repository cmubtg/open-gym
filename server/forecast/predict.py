import argparse
import joblib
import numpy as np

# Argument parsing
parser = argparse.ArgumentParser()
parser.add_argument("--day_of_week", help="day of week (numeric)", type=int, required=True)
parser.add_argument("--month", help="month", type=int, required=True)
parser.add_argument("--hour", help="hour (24-hr)", type=int, required=True)
parser.add_argument("--is_weekend", help="true for weekends, false otherwise", type=bool, required=True)
parser.add_argument("--is_holiday", help="true for holidays, false otherwise", type=bool, required=True)
parser.add_argument("--is_start_of_semester", help="true if start of semester, false otherwise", type=bool, required=True)
parser.add_argument("--temperature", help="temperature (in Fahrenheit)", type=float, required=True)

# Exception handling
try: 
    args = parser.parse_args()
except SystemExit:
    raise ValueError("Invalid argument passed into predict.py.") from None

# Input formatting
input_data = np.array([args.day_of_week, args.is_weekend, args.is_holiday, args.temperature,
                    args.is_start_of_semester, args.month, args.hour]).reshape(1, -1)

# Model prediction
model = joblib.load("model.joblib")
prediction = max(0, round(model.predict(input_data)[0]))

print(prediction)