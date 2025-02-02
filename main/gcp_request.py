import requests

# Clould ML identifier
project_region = "us-central1"
project_id = 'boyu-io'


def image_download(map_object):
    data = map_object[1]
    cloud_function_request("ebay_pillow", data)
    return


def vgg_16_predict(map_object):
    data = map_object[1]
    cloud_function_request("ebay_vgg16", data)
    return


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
