from flask import Flask


app = Flask(__name__)

@app.route('/')
def helloworld():
    return 'Henlo Werld carran'

@app.route('/api/getideas')
def getIdeas():
    return 'GameJamz ideas'