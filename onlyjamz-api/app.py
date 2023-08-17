from flask import Flask, jsonify, redirect, render_template, request, url_for, session
from flask_cors import CORS, cross_origin
import os
import openai
import psycopg2
from dotenv import load_dotenv

load_dotenv()

try:
    conn = psycopg2.connect(
        host = os.getenv("DB_HOST"),
        database = "onlyjamz",
        user = os.getenv("DB_USERNAME"),
        password = os.getenv("DB_PASSWORD")
    )

except:
    print("USERMSG: could not connect to database")
    conn = None


app = Flask(__name__)
cors = CORS(app)
openai.api_key = os.getenv("OPENAI_API_KEY")
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")


@app.route('/')
def helloworld():
    return 'Flask App is Running...'

@app.route('/api/getideas')
# any route that we do accessed from another server (pulled from another website, ie api routes) needs the below line in the route
@cross_origin()
def getIdeas():
    return 'GameJamz ideas'


@app.route("/api/chatgpt", methods=("GET", "POST"))
def chatgpt():
    if request.method == "POST":
        submittedRequest = request.get_json()
        aiPrompt = submittedRequest['aiPrompt']
        response = openai.Completion.create(
            engine="text-davinci-003",
            max_tokens=3800,
            prompt=generate_prompt(aiPrompt),
            temperature=0.6,
            format= 'text'
        )

        items = response.choices[0].text.strip().split("======")

        items_list = []
        for item in items:
            if item.strip():  # Exclude empty lines
                items_list.append(item.strip())

        return jsonify(items_list)


        # aiResponse = response.choices[0].text
        # print(aiResponse)
        # return jsonify(aiResponse)
    return "This is an API you shouldn't see this. go to this URL instead."


@app.route("/api/saveIdea", methods=["POST"])
def saveidea():
    try:
        conn = psycopg2.connect(
            host = os.getenv("DB_HOST"),
            database = "onlyjamz",
            user = os.getenv("DB_USERNAME"),
            password = os.getenv("DB_PASSWORD")
        )

    except:
        print("USERMSG: could not connect to database")
        conn = None

    submittedRequest = request.get_json()
    print(submittedRequest)
    
    if conn != None:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO projects (userid, title, summary, detailed)"
            "VALUES (%s, %s, %s, %s)",
            (
                "1",
                "PROJECT TITLE",
                submittedRequest["idea"],
                "detailed game overview",
            )
        )
    # committing all database changes and closing connections
    conn.commit()
    print("CLOSING DATABASE!")
    conn.close()
 
    return "Idea saved to the database"

@app.route("/api/projects", methods=["GET"])
def listProjects():
    try:
        conn = psycopg2.connect(
            host = os.getenv("DB_HOST"),
            database = "onlyjamz",
            user = os.getenv("DB_USERNAME"),
            password = os.getenv("DB_PASSWORD")
        )

    except:
        print("USERMSG: could not connect to database")
        conn = None

    if conn != None:
        cur = conn.cursor()
        cur.execute("SELECT * FROM projects")
        all_projects = cur.fetchall()
        print("RETURNING PROJECTS IN DATABASE...")
        for project in all_projects:
            print(project[2])

    # committing all database changes and closing connections
    conn.commit()
    print("CLOSING DATABASE!")
    conn.close()
 
    return "PROJECTS SHOWN"
 


# ========================= END ROUTES START FUNCTIONS==============================

def generate_prompt(aiPrompt):
    return """
        Suggest 4 ideas for an indie game jam, with each idea made up of 3 paragraphs consisting of the following rules: 
        • Come up with a descriptive and catchy title that suits the theme. this title is not counted towards the 3 paragraphs of explanation text. 
        • Each title should have <h3> before the title text and </h3> after the title text. 
        • Ensure there are 4 separate ideas. 
        • Do not prefix ideas with a number. 
        • Each paragraph should be wrapped in <p> and </p> around the paragraph. 
        • Separate each idea with a line of six equal signs, like this: ======
        • The addition of the stars row does not count towards the 3 paragraphs. 
        • First paragraph consists of an overview of the general game idea, which should include the following criteria: {}
        • Second paragraph explains the basics of the game mechanics and core gameplay loop, for example how the game is played by the player. 
        Third paragraph delves into more detail around the art style and theme of the game, including any specific character models and how they are represented on screen.
        • Do not put any text after the ideas, just give the ideas themselves.
        """.format(aiPrompt)
