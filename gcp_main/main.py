import requests
import flask
import json
from multiprocessing import Pool
import logging

from gcp_request import get_request, cloud_function_request, image_download, vgg_16_feature

def ebay_broken_image(request):
    # set default keyward as 'hat'
    keyword = "hat"
    data_count = 25

    # if keyward passed by the request object, update keyward
    if request is not None:

        # get keyword
        keyword = get_request(request, 'keyword', keyword)
        data_count = get_request(request, 'data_count', data_count)

    # beautifulsoup web scraper
    payload = {'keyword': keyword, 'data_count': data_count}
    data_set = cloud_function_request("ebay_beautifulsoup", payload)

    p1 = Pool(10)
    image_set = p1.map(image_download, enumerate(data_set))
    p1.close()
    p1.join()

    # prep subset for multiprocessing vgg16 feature extraction
    # [{"id": (int), "img_data": (array)} * 20]
    # subset size of 20 keep below maximum input size
    count = 0
    vgg16_pool_set = []
    while True:
        if count + 20 >= len(image_set):
            break
        subset = []
        for i in range(count, count+20):
            subset.append(image_set[i])
        vgg16_pool_set.append({"dataset": subset})
        count += 20

    # handel the remainder of the data
    subset = []
    for i in range(count, len(image_set)):
        subset.append(image_set[i])
    vgg16_pool_set.append({"dataset": subset})

    for m in vgg16_pool_set:
        logging.warn(m)


    p2 = Pool(5)
    vgg16_set = p2.map(vgg_16_feature, enumerate(vgg16_pool_set))
    p2.close()
    p2.join()

    logging.warn(vgg16_set)

    prediction = []
    for v in vgg16_set:
        prediction += v["vgg16_set"]
    prediction = sorted(prediction, key=lambda x: x['id'])
    for i in range(len(data_set)):
        data_set[i]["vgg16"] = prediction[i]["vgg16"]


    return flask.jsonify(data_set)
