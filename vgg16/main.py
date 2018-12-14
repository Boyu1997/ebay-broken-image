from PIL import Image
import requests
from io import BytesIO
import numpy as np

import flask
from flask import request
import json

from gcp_request import ml_predict, get_request

def ebay_vgg16(request):
    # default keyward for testing
    id = "undefined"
    img_link = "https://i.ebayimg.com/thumbs/images/m/m6ipZBqkTZxwJ0lPsG9UsOQ/s-l225.jpg"

    # if keyward passed by the request object, update keyward
    if request is not None:
        # get keyword
        id = get_request(request, 'id', id)
        img_link = get_request(request, 'img_link', img_link)

    response = requests.get(img_link)
    img = Image.open(BytesIO(response.content))
    img = img.convert('RGB')
    img = img.resize((224,224))
    data = np.array(list(img.getdata()))
    data = data.reshape(224, 224, 3)
    data = data.tolist()

    # conver image into feature using vgg16
    instances = data
    prediction = ml_predict(instances)

    return flask.jsonify({
        "id": id,
        "vgg16": prediction[0]["scores"],
    })
