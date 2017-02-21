from flask import Flask, request
import json
app = Flask(__name__)

@app.route('/')
def index():
    return 'Server response'

@app.route('/check_id/', methods=['GET'])
def check_id():
    print(request.args.get('id'))
    return json.dumps({'exist': False})


@app.route('/post/', methods=['POST'])
def post():
    print(request.data[:100])
    return 'Posted'

if __name__ == '__main__':
    app.run('0.0.0.0', 8000, debug=True)
