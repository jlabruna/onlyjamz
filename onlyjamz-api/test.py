import requests
import os
from app import generate_prompt

# Test if the envies are set (just checks if they arent None). 

def test_env():
    assert os.getenv("DB_HOST") is not None
    assert os.getenv("DB_USERNAME") is not None
    assert os.getenv("DB_PASSWORD") is not None
    assert os.getenv("OPENAI_API_KEY") is not None
    assert os.getenv("SECRET_KEY") is not None

# Test if the generate_prompt function returns a string (checks if the type of the returned val is str!)

def test_gen_prompt():
    assert type(generate_prompt("test prompt")) == str

# Test if root returns a 200 code 

def test_root_url():
    response = requests.get("https://onlyjamz.onrender.com/")
    assert response.status_code == 200

# Test if '/api/saveIdea' has a 200 as well 

def test_status_code():
    payload = {"idea": "<h3>Test Idea</h3><p>Test overview</p><p>Test gameplay</p><p>Test art style</p>======<p>Test idea 2</p><p>Test overview 2</p><p>Test gameplay 2</p><p>Test art style 2</p>"}
    response = requests.post("https://onlyjamz.onrender.com/api/saveIdea", json=payload)
    assert response.status_code == 200

# Test if the text is showin up

def test_ifrunnin():
    response = requests.get("https://onlyjamz.onrender.com/")
    assert response.text == "Flask App is Running..."


# The amount of CORS errors i got was silly. here's a test that supposedly checks if it works ok

def test_cors_headers():
    response = requests.get("https://onlyjamz.onrender.com/")
    assert response.headers.get("Access-Control-Allow-Origin") == "*"