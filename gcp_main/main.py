import requests
import flask
import json
import logging
import time
import string
import hashlib
import numpy as np
from multiprocessing import Pool
from sklearn.decomposition import PCA

from gcp_request import get_request, cloud_function_request, image_download, vgg_16_predict

from google.cloud import storage

def ebay_broken_image(request):

    # handel 'OPTIONS' request
    if request.method == 'OPTIONS':
        response = flask.Response()
        response.headers.set('Access-Control-Allow-Origin', '*')
        response.headers.set('Access-Control-Allow-Headers', '*')
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST')
        return (response)

    # set default
    keyword = "hat"
    amount = 60
    model_version = "pool_5"

    # if keyward passed by the request object, update keyward
    if request is not None:

        # get keyword
        keyword = get_request(request, 'keyword', keyword)
        amount = get_request(request, 'amount', amount)
        amount = int(amount)
        model_version = get_request(request, 'model_version', model_version)

    # beautifulsoup web scraper
    payload = {'keyword': keyword, 'amount': amount}
    data_set = cloud_function_request("ebay_beautifulsoup", payload).json()

    logging.warn("Web scriping completed!")

    # generate hash as storage id
    for i in range(len(data_set)):
        data_set[i]['storage_id'] = hashlib.sha256(data_set[i]['img_link'].encode('utf-8')).hexdigest()

    # check if images in cloud storage
    client = storage.Client()
    bucket = client.get_bucket('ebay_broken_image')
    download_input = []
    for d in data_set:
        blob = bucket.blob('image/{:s}.json'.format(d['storage_id']))
        if not blob.exists():
            download_input.append({
                "storage_id": d['storage_id'],
                "img_link": d["img_link"],
                "id": d["id"],
            })

    # download images not in cloud storage
    p1 = Pool(30)
    p1.map(image_download, enumerate(download_input))
    p1.close()
    p1.join()

    logging.warn("All images in cloud storage!")

    # check if model prediction in cloud storage
    vgg_16_input = []
    counter = -1
    for d in data_set:
        blob = bucket.blob('prediction/{:s}/{:s}.json'.format(model_version, d['storage_id']))
        if not blob.exists():
            counter += 1
            if counter % 20 == 0:
                vgg_16_input.append([])
            vgg_16_input[int(counter/20)].append({
                "storage_id": d['storage_id'],
                "model_version": model_version,
            })

    # predict for prediction not in cloud storage using vgg16 ml engine
    p2 = Pool(5)
    p2.map(vgg_16_predict, enumerate(vgg_16_input))
    p2.close()
    p2.join()

    logging.warn("All VGG16 prediction in cloud storage!")

    feature_set = []
    for d in data_set:
        blob = bucket.blob('prediction/{:s}/{:s}.json'.format(model_version, d['storage_id']))
        feature_set.append(json.loads(blob.download_as_string()))

    feature_set = np.array(feature_set)
    feature_set = feature_set.reshape(len(data_set), 2048)

    pca = PCA(n_components=2)
    pca_set = pca.fit_transform(feature_set)

    logging.warn("PCA reduction completed!")
    pca_set = pca_set.tolist()

    for i in range(len(data_set)):
        data_set[i]["feature"] = pca_set[i]

    response = flask.jsonify(data_set)
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Headers', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST')
    return response
