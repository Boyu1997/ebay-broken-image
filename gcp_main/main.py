import requests
import flask
import json

from gcp_request import get_request, cloud_function_request

def ebay_broken_image(request):
    # set default keyward as 'hat'
    keyword = "hat"
    data_count = 10

    # if keyward passed by the request object, update keyward
    if request is not None:

        # get keyword
        keyword = get_request(request, 'keyword', keyword)
        data_count = get_request(request, 'data_count', data_count)

    # beautifulsoup web scraper
    payload = {'keyword': keyword, 'data_count': data_count}
    response = cloud_function_request("ebay_beautifulsoup", payload)
    data_set = response.json()


    for i in range(len(data_set)):
        # pillow download image data
        payload = {"id": data_set[i]["id"], "img_link": data_set[i]["img_link"]}
        response = cloud_function_request("ebay_pillow", payload)
        image_data = response.json()

        # pillow download image data
        payload = {"id": image_data["id"], "img_data": image_data["img_data"]}
        response = cloud_function_request("ebay_vgg16", payload)
        vgg16_data = response.json()

        data_set[i]["vgg16"] = vgg16_data["vgg16"]




    return flask.jsonify(data_set)

    #
    # download_data = json.loads(download_response.text)
    #
    # # beautifulsoup web scraper
    # request_url = cloud_function_url("ebay_pillow")
    #
    # # download image
    # download_api_url = "https://us-central1-vertical-sunset-186521.cloudfunctions.net/ebay-download-image"
    #
    # for i in range(len(data_set)):
    #     payload = {'id': i, 'img_link': data_set[i]["img_link"]}
    #     download_response = requests.post(download_api_url, json=payload)
    #     download_data = json.loads(download_response.text)
    #     data_set[i]["id"] = download_data["id"]
    #     data_set[i]["img_data"] = download_data["img_data"]
    #
    # return flask.jsonify(data_set)
