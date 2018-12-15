from PIL import Image
import requests
from io import BytesIO
import numpy as np
import logging

import flask
from flask import request
import json

from gcp_request import ml_predict, get_request

def ebay_vgg16(request):

    logging.warn(request.get_json())

    dataset = get_request(request, "dataset")

    logging.warn(dataset)

    image_set = []
    id_set = []
    for d in dataset:
        image_set.append(d["img_data"])
        id_set.append(d["id"])

    # conver image into feature using vgg16
    prediction = ml_predict(image_set)

    vgg16_set = []
    for i in range(len(prediction)):
        vgg16_set.append({"id": id_set[i], "vgg16": prediction[i]["scores"]})

    return flask.jsonify({"vgg16_set": vgg16_set})
