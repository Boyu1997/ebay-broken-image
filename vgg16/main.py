from PIL import Image
import requests
from io import BytesIO
import numpy as np
from keras.applications.vgg16 import VGG16
import flask
from flask import request

import json
import pandas as pd

from gcp_mlengine_request import ml_predict

def get_image_data(img_link):
    response = requests.get(img_link)
    img = Image.open(BytesIO(response.content))
    img = img.convert('RGB')
    img = img.resize((224,224))
    data = np.array(list(img.getdata()))
    data = data.reshape(224, 224, 3)
    return data



def ebay_vgg16(request, local=False, local_data=False):

    # obtain image data
    if local_data:
        img_set = np.load("test.npy")
    else:
        if request is None:
            return None
        else:
            request_json = request.get_json()
            if request.args and 'data' in request.args:
                data = request.args.get('data')
            elif request_json and 'data' in request_json:
                data = request_json['data']
            else:
                return None

        img_set = []
        for d in data:
            img_data = get_image_data(d['img_link'])
            img_set.append(img_data)

        print ("Total {:d} image data".format(len(img_set)))
        img_set = np.array(img_set)
        np.save("test.npy", img_set)

    # conver image into feature using vgg16
    if local:
        model = VGG16(weights='imagenet', include_top=False, input_shape=(224,224,3))
        feature = model.predict(img_set)
        feature = feature.tolist()

    else:
        # define Clould ML identifier
        projectID = 'vertical-sunset-186521'
        modelID = 'ebay_vgg16_mlengine'
        versionID = 'v_2018_12_13_07_14'

        feature = []
        print ("{:d} iamge to process".format(img_set.shape[0]))
        for i in range(img_set.shape[0]):
            instances = (img_set[i]).tolist()
            this_prediction = ml_predict(instances, projectID, modelID, versionID)
            print ("image {:d} completed".format(i))
            feature.append(this_prediction)

        return

    return flask.jsonify(feature)


# code for local testing
if __name__=='__main__':
    app = flask.Flask(__name__)
    with app.test_request_context(method='POST'):
        request.args = {'data': None}
        ebay_vgg16(request, local_data=True)
