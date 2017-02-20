from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def index():
    return 'Server response'

@app.route('/post/', methods=['POST'])
def post():
    print(request.data)
    return 'Posted'

if __name__ == '__main__':
    app.run('0.0.0.0', 8000, debug=True)
