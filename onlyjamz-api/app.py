from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def helloworld():
    return 'Flask App is Running...'

@app.route('/api/getideas')
# any route that we do accessed from another server (pulled from another website, ie api routes) needs the below line in the route
@cross_origin()
def getIdeas():
    return 'GameJamz ideas'

@app.route('/test')
@cross_origin()
def testData():
    testDataFake = [
    "1. Elemental Clash: Players control elemental mages in a dynamic arena, using spells to manipulate the environment and battle opponents. Master the art of combining fire, water, earth, and air to create devastating effects and emerge victorious.",
    "2. Space Salvagers: Set in a post-apocalyptic galaxy, players become salvagers who navigate treacherous asteroid fields to retrieve valuable resources from derelict spaceships. Customize and upgrade your salvaging ship while fending off rival salvagers and space pirates.",
    "3. Time Quest: A time-traveling RPG where players explore historical periods to solve mysteries and correct anomalies. As a member of the Temporal Agency, you'll collect artifacts, interact with famous figures, and make critical decisions to restore the timeline.",
    "4. Quantum Conundrum: A puzzle-platformer that leverages quantum physics principles. Players manipulate quantum states to solve intricate puzzles, shifting between parallel dimensions, altering time, and bending reality to overcome mind-bending challenges.",
    "5. Mythic Odyssey: Embark on a journey through diverse mythologies, from Greek to Norse to Japanese folklore. Players shape-shift into legendary creatures, solve mythology-inspired puzzles, and engage in epic battles against monstrous foes in an expansive open world."
]
    # the print will appear in the browser, the return will appear in the route. return = response.
    print(testDataFake)
    return jsonify(testDataFake)