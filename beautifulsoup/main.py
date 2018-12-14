from urllib.request import urlopen
from urllib.parse import urlencode
from bs4 import BeautifulSoup
import requests
import flask
import json

from gcp_request import get_request
from parse import parse_item_ebay, ebay_url

headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"
}

def ebay_beautifulsoup(request):
    # default keyward for testing
    keyword = "hat"
    search_stop = 30

    # if keyward passed by the request object, update keyward
    if request is not None:

        # get keyword
        keyword = get_request(request, 'keyword', keyword)
        search_stop = get_request(request, 'search_stop', search_stop)

    # initialize parameters
    data_set = []
    i = 1

    # keep searching next page
    while True:

        # stop when have enough data
        if len(data_set) > search_stop:
            break

        page_link = ebay_url(keyword, i)
        page_response = requests.get(page_link, headers=headers).text
        page_content = BeautifulSoup(page_response, "html.parser")

        if page_content.find(class_='srp-results') is not None:
            search_results = page_content.find(class_='srp-results srp-grid clearfix').find_all(class_='s-item')
            for item in search_results:
                data_set.append(parse_item_ebay(item))
        else:
            break

    return flask.jsonify(data_set)
