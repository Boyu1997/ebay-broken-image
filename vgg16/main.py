from google.cloud import storage

import flask
from flask import request
import json

from gcp_request import ml_predict, get_request

def ebay_vgg16(request):

    storage_id = get_request(request, "storage_id")
    start = get_request(request, "start")
    end = get_request(request, "end")

    client = storage.Client()
    bucket = client.get_bucket('ebay_broken_image')
    dataset = []

    for i in range(start, end):
        blob = bucket.blob('{}/img_{}.json'.format(storage_id, i))
        dataset.append(json.loads(blob.download_as_string()))

    # conver image into feature using vgg16
    prediction = ml_predict(dataset)

    vgg16_set = []
    for i in range(len(prediction)):
        vgg16_set.append({"id": start + i, "vgg16": prediction[i]["scores"]})

    return flask.jsonify({"vgg16_set": vgg16_set})
