from beautifulsoup import main as beautifulsoup

import flask

app = flask.Flask(__name__)

with app.app_context():
    data = beautifulsoup(None)
    print (data.get_json())
