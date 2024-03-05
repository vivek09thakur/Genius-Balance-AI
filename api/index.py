from flask import Flask,request,jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/greet', methods=['POST'])
def greet():
    data = request.get_json()
    name = data['name']
    return jsonify({'message': f'Hello, {name}!'})

