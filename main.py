from beautifulsoup import main as beautifulsoup
from vgg16 import main as vgg16
from flask import request
import flask
import numpy as np

app = flask.Flask(__name__)

with app.test_request_context(method='POST'):
    # known keywords: ['hat', 'shirt']
    # known buggy keywords: ['phone', 'toy', 'cup', 'camera', 'calculator']
    request.args = {'keyword': 'shirt'}
    response = beautifulsoup(request)
    data = response.get_json()

with app.test_request_context(method='POST'):
    request.args = {'data': data}
    response = vgg16(request)
    feature = response.get_json()

feature = np.array(feature)
print (feature.shape)
