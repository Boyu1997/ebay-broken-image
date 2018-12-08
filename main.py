from beautifulsoup import main as beautifulsoup
from flask import request
import flask

app = flask.Flask(__name__)

with app.test_request_context(method='POST'):
    # known keywords: ['hat', 'shirt']
    # known buggy keywords: ['phone', 'toy', 'cup', 'camera', 'calculator']
    request.args = {'keyword': 'shirt'}
    data = beautifulsoup(request)
    print (data.get_json())
