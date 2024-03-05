from flask import Flask,request

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/loader', methods=['POST'])
def test():
    data = request.get_json()
    file_path = data['file_path']
    with open(file_path, 'r') as file:
        file_content = file.read()
    return f'File content: {file_content}', 200