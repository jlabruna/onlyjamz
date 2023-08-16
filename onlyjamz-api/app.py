from flask import Flask, jsonify, redirect, render_template, request, url_for, session
from flask_cors import CORS, cross_origin
import os
import openai
import psycopg2
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt

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
bcrypt = Bcrypt(app)
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
            max_tokens=2048,
            prompt=generate_prompt(aiPrompt),
            temperature=0.6,
            format= 'text'
        )

        items = response.choices[0].text.strip().split("\n")

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
 

# Login and Logout Routes here


@app.route("/api/user")
def process_user():

    user_status = None
    form_username = request.args.get("username")
    print(form_username)
    form_password = request.args.get("password").encode('utf-8')
    print(form_password)

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

        cur.execute("SELECT * FROM users WHERE username=%s;", [form_username])
        result = cur.fetchone()
        
        # if username exists
        if result != None:
            print("RESULT:")
            print(result)
            password_hash = result[2] # Get the saved PW from the DB
            #user exists then check if password matches
            if bcrypt.check_password_hash(password_hash, form_password):
                user_status="LOGGED"
                print("USER MATCHED AND LOGGED IN!")
                redirect_url = "http://localhost:5173/?status=" + str(user_status) + "&username=" + str(form_username) + "&id=" + str(result[0])
                return redirect(redirect_url)


        
        #if username doesnt exist
        else:

            form_password_hash = bcrypt.generate_password_hash(form_password).decode('utf-8')
            print("FORM PASSWORD HASH:")
            print(form_password_hash)
            cur.execute("INSERT INTO users(username, password) VALUES(%s, %s);", [form_username, form_password_hash])
            print("ADDED USERNAME: " + form_username)
            cur.execute("SELECT * FROM users WHERE username=%s;", [form_username])
            result = cur.fetchone()
            print("CHECKING USERNAME EXISTS:")
            print(result[1])
            if result[1]==form_username:    
                user_status="CREATED"
                redirect_url = "http://localhost:5173/?status=" + str(user_status) + "&username=" + str(form_username) + "&id=" + str(result[0])
                return redirect(redirect_url)


    conn.commit()
    conn.close()

    # this is a time thing - this is a security risk but running out of time :)
    return redirect("http://localhost:5173/")






# ========================= END ROUTES START FUNCTIONS==============================

def generate_prompt(aiPrompt):
    return """Suggest 5 indie game ideas for a game jam, each idea should be 1 paragraph long. The Game should be {}""".format(aiPrompt)




