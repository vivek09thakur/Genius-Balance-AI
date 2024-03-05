from flask import Flask,request,jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/loader',methods=['POST'])
def loader():
    if 'csv_data' not in request.files:
        return jsonify({'error':'No file part'})
    
    csv_file = request.files['csv_data']
    if csv_file.filename == '':
        return jsonify({'error':'No selected file'})
    
    if not csv_file.filename.endswith('.csv'):
        return jsonify({'error':'Invalid file type, file must be in csv format'})
    
    try:
        df = pd.read_csv(csv_file)
        data = df.to_dict(orient='records')
        return jsonify({'data':data})
    except Exception as e:
        return jsonify({'error':str(e)})

