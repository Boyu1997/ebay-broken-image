from PIL import Image
import requests
from io import BytesIO
import numpy as np
from keras.applications.vgg16 import VGG16
import flask

def get_image_data(img_link):
    response = requests.get(img_link)
    img = Image.open(BytesIO(response.content))
    img = img.convert('RGB')
    img = img.resize((224,224))
    data = np.array(list(img.getdata()))
    data = data.reshape(224, 224, 3)
    return data

def ebay_vgg16(request):
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
    X = np.array(img_set)
    model = VGG16(weights='imagenet', include_top=False, input_shape=(224,224,3))
    feature = model.predict(X)
    # second_last = model.layers[-2].output
    # print (second_last)
    feature = feature.tolist()

    return flask.jsonify(feature)
