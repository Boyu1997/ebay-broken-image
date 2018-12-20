import requests
import flask
import json
import logging
import time
import string
import random
import numpy as np
from multiprocessing import Pool
from sklearn.decomposition import PCA

from gcp_request import get_request, cloud_function_request, image_download, vgg_16_feature

def ebay_broken_image(request):
    # set default keyward as 'hat'
    keyword = "hat"
    data_count = 60

    # if keyward passed by the request object, update keyward
    if request is not None:

        # get keyword
        keyword = get_request(request, 'keyword', keyword)
        data_count = get_request(request, 'data_count', data_count)

    # beautifulsoup web scraper
    payload = {'keyword': keyword, 'data_count': data_count}
    data_set = cloud_function_request("ebay_beautifulsoup", payload).json()

    logging.warn("Web scriping completed!")

    timestamp = time.strftime('%Y%m%d_%H%M%S', time.gmtime())
    appendix = "".join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=5))
    storage_id = 'data_{}_{}'.format(timestamp, appendix)

    download_input = []
    for i in range(data_count):
        download_input.append({
            "storage_id": storage_id,
            "img_link": data_set[i]["img_link"],
            "id": data_set[i]["id"],
        })

    # download images
    p1 = Pool(30)
    p1.map(image_download, enumerate(download_input))
    p1.close()
    p1.join()

    logging.warn("Image download completed!")

    vgg_16_input = []

    count = 0
    while True:
        if count + 20 >= data_count:
            vgg_16_input.append({
                "storage_id": storage_id,
                "start": count,
                "end": data_count,
            })
            break
        vgg_16_input.append({
            "storage_id": storage_id,
            "start": count,
            "end": count+20,
        })
        count += 20

    # call vgg16 ml engine
    p2 = Pool(5)
    vgg16_set = p2.map(vgg_16_feature, enumerate(vgg_16_input))
    p2.close()
    p2.join()

    logging.warn("Vgg16 feature extraction completed!")

    prediction = []
    for v in vgg16_set:
        prediction += v["vgg16_set"]
    prediction = sorted(prediction, key=lambda x: x['id'])

    for i in range(len(data_set)):
        prediction[i] = prediction[i]["vgg16"]

    prediction = np.array(prediction)
    prediction = prediction.reshape(len(data_set), 2048)

    pca = PCA(n_components=2)
    pca_prediction = pca.fit_transform(prediction)

    logging.warn("PCA reduction completed!")
    pca_prediction = pca_prediction.tolist()

    for i in range(len(data_set)):
        data_set[i]["feature"] = pca_prediction[i]

    return flask.jsonify(data_set)
