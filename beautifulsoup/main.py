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
    amount = 30

    # if keyward passed by the request object, update keyward
    if request is not None:

        # get keyword
        keyword = get_request(request, 'keyword', keyword)
        amount = get_request(request, 'amount', amount)

    # initialize parameters
    parse_set = []
    i = 1

    # keep searching next page
    while True:

        # stop when have enough data
        if len(parse_set) > amount:
            break

        page_link = ebay_url(keyword, i)
        page_response = requests.get(page_link, headers=headers).text
        page_content = BeautifulSoup(page_response, "html.parser")

        i += 1

        # gather data from page
        if page_content.find(class_='srp-results srp-grid clearfix') is not None:
            search_results = page_content.find(class_='srp-results srp-grid clearfix').find_all(class_='s-item')
            for item in search_results:
                parse_set.append(parse_item_ebay(item))
        elif page_content.find(class_='gv-ic full-width left') is not None:
            search_results = page_content.find(class_='gv-ic full-width left').find_all(class_='sresult gvresult')
            for item in search_results:
                parse_set.append(parse_item_ebay(item))
        else:
            break

    # select requested amount of data, add "id" field
    data_set = []
    for i in range(len(parse_set)):
        entry = parse_set[i]
        entry["id"] = i
        data_set.append(entry)

    return flask.jsonify(data_set)
