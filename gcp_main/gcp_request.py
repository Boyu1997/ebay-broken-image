import requests

# Clould ML identifier
project_region = "us-central1"
project_id = 'rolling-salmon'


def image_download(map_object):
    data = map_object[1]
    response = cloud_function_request("ebay_pillow", data)
    return response


def vgg_16_feature(map_object):
    data = map_object[1]
    response = cloud_function_request("ebay_vgg16", data)
    response_json = response.json()
    return response_json


def cloud_function_request(function_name, payload):
    request_url = "https://{:s}-{:s}.cloudfunctions.net/{:s}".format(project_region, project_id, function_name)
    response = requests.post(request_url, json=payload)
    return response


def get_request(request, key, default):
    request_json = request.get_json()
    if request.args and key in request.args:
        data = request.args.get(key)
    elif request_json and key in request_json:
        data = request_json[key]
    else:
        data = default
    return data
