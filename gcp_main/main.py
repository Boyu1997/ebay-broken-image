import requests
import flask
import json

from gcp_request import get_request, cloud_function_url

def ebay_broken_image(request):
    # set default keyward as 'hat'
    keyword = "hat"
    search_stop = 30

    # if keyward passed by the request object, update keyward
    if request is not None:

        # get keyword
        keyword = get_request(request, 'keyword', keyword)
        search_stop = get_request(request, 'search_stop', search_stop)

    # beautifulsoup web scraper
    request_url = cloud_function_url("ebay_beautifulsoup")
    payload = {'keyword': keyword, 'search_stop': search_stop}
    response = requests.post(request_url, json=payload)
    data_set = response.json()

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
