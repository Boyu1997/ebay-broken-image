from google.cloud import storage

import flask
from flask import request
import json

from gcp_request import ml_predict

def ebay_vgg16(request):

    data_set = request.get_json()

    client = storage.Client()
    bucket = client.get_bucket('ebay_broken_image')

    # get image data from cloud storage
    image_set = []
    for d in data_set['storage_id']:
        blob = bucket.blob('image/{:s}.json'.format(d))
        image_set.append(json.loads(blob.download_as_string()))

    # call VGG16 model for prediction
    prediction = ml_predict(image_set, data_set['model_version'])

    for i in range(len(prediction)):
        blob = bucket.blob('prediction/{:s}/{:s}.json'.format(data_set['model_version'], data_set['storage_id'][i]))
        blob.upload_from_string(json.dumps(prediction[i]["scores"]))

    return
