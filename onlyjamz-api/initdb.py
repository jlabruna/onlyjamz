# import os gets environment variables from other files - a library of functions to do things with OS
import os
# database library
import psycopg2
from flask import Flask, render_template
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# setting up a generic function to connect to the database throughout the app
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

# starting db init

if conn != None:
    # creating a position to do stuff with db
    cur = conn.cursor()
    print("DROPPING EXISTING USER TABLE...")
    cur.execute("DROP TABLE IF EXISTS users;")
    print("CREATING USER TABLE...")
    cur.execute(
        "CREATE TABLE users (id serial PRIMARY KEY,"
        "username varchar (150) NOT NULL,"
        "password varchar (150) NOT NULL);"  
        )
    print("ADDING USERS")
    user_list = {
        "greg":"greg",
        "fred":"fred",
        "roger":"roger",

    }
    for user in user_list:

        cur.execute(
            "INSERT INTO users (username, password)"
            "VALUES (%s, %s)", 
            (user, user_list[user]),
        )
        print("ADDED %s" % user)
        
    cur.execute("SELECT * FROM users")
    all_users = cur.fetchall()
    print("RETURNING USERS IN DATABASE...")
    for user in all_users:
        print(user[1])
    
    print("====================================")
    
    # doing the projects table now
    print("DROPPING EXISTING PROJECT TABLES...")
    cur.execute("DROP TABLE IF EXISTS projects;")
    print("CREATING PROJECT TABLE...")
    cur.execute(
        "CREATE TABLE projects (id serial PRIMARY KEY,"
        "userid int NOT NULL,"
        "title varchar (150),"
        "summary text,"
        "detailed text,"
        "notes text);"    
        )
    print("ADDING PROJECTS")

    cur.execute(
       "INSERT INTO projects (userid, title, summary, detailed, notes)"
       "VALUES (%s, %s, %s, %s, %s)",
       (
           "1",
           "Lost in Space",
           "The player is a space explorer sent to a distant planet to investigate a mysterious signal. After a crash-landing, they must fight their way through hordes of alien creatures to discover the source of the signal and find a way home.",
           "detailed1",
           "notes1",
       )
    )

    cur.execute(
       "INSERT INTO projects (userid, title, summary, detailed, notes)"
       "VALUES (%s, %s, %s, %s, %s)",
       (
        
            "1",
            "Dark Horizon",
            "The player is a space pilot, stranded on a dark and abandoned space station. Armed with only a laser pistol, they must explore the station and battle their way through robotic enemies to find a way to escape",
            "detailed2",
            "notes2"

       )
    )

    cur.execute(
       "INSERT INTO projects (userid, title, summary, detailed, notes)"
       "VALUES (%s, %s, %s, %s, %s)",
       (

            "1",
            "Star Wars",
            "The player is a rebel fighter pilot on a mission to destroy a powerful Imperial superweapon. Along the way they must battle waves of enemy fighters, evade or destroy powerful turrets and outwit Imperial forces to complete their mission",
            "detailed3",
            "notes3",
       )
    )

    cur.execute(
       "INSERT INTO projects (userid, title, summary, detailed, notes)"
       "VALUES (%s, %s, %s, %s, %s)",
       (
            "1",
            "Alien Invasion",
            "The player is a soldier defending their home planet from an alien invasion. With limited resources, they must fight their way through hordes of alien creatures and uncover the source of the invasion before it's too late.",
            "detailed4",
            "notes4",

       )
    )


    cur.execute("SELECT * FROM projects")
    all_projects = cur.fetchall()
    print("RETURNING PROJECTS IN DATABASE...")
    for project in all_projects:
        print(project[2])


    # committing all database changes and closing connections
    conn.commit()
    print("DATABASE INITIALISED!")
    cur.close()
    conn.close()