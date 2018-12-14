import flask
from flask import request
import json

from gcp_request import ml_predict, get_request

def ebay_vgg16(request):

    # if keyward passed by the request object, update keyward
    if request is not None:
        # get keyword
        img_data = get_request(request, 'img_data')

    # conver image into feature using vgg16
    instances = img_data
    prediction = ml_predict(instances)

    return flask.jsonify(prediction)
