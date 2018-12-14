import requests
import flask
import json
from multiprocessing.dummy import Pool

from gcp_request import get_request, cloud_function_request, get_vgg16_feature

def ebay_broken_image(request):
    # set default keyward as 'hat'
    keyword = "hat"
    data_count = 50

    # if keyward passed by the request object, update keyward
    if request is not None:

        # get keyword
        keyword = get_request(request, 'keyword', keyword)
        data_count = get_request(request, 'data_count', data_count)

    # beautifulsoup web scraper
    payload = {'keyword': keyword, 'data_count': data_count}
    data_set = cloud_function_request("ebay_beautifulsoup", payload)

    pool = Pool(50)

    feature_set = pool.map(get_vgg16_feature, enumerate(data_set))
    pool.close()
    pool.join()

    feature_set = sorted(feature_set, key=lambda x: x['id'])

    for i in range(len(data_set)):
        data_set[i]["vgg16"] = feature_set[i]["vgg16"]


    return flask.jsonify(data_set)
