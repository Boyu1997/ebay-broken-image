from urllib.request import urlopen
from urllib.parse import urlencode
from bs4 import BeautifulSoup
import requests
import flask

def ebay_url(keyword, page):
    ROOT = 'https://www.ebay.com/sch/i.html?'
    url = ROOT + urlencode({'_nkw': keyword, '_pgn': page})
    return url

def parse_item_ebay(item):
    product_link = item.find(class_="s-item__link").attrs['href']
    pic_link = item.find(class_='s-item__image-img').attrs['src']
    price = item.find(class_="s-item__price").text
    name = item.find(class_="s-item__title").text
    return {
        'product_link': product_link,
        'pic_link': pic_link,
        'price': price,
        'name': name,
    }

headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"
}

def main(request):
    # set default keyward as 'hat'
    keyword = "hat"

    # if keyward passed by the request object, update keyward
    if request is not None:
        request_json = request.get_json()
        if request.args and 'keyword' in request.args:
            keyword = request.args.get('keyword')
        elif request_json and 'keyword' in request_json:
            keyword = request_json['keyword']

    result = []
    i = 1

    page_link = ebay_url(keyword, i)
    page_response = requests.get(page_link, headers=headers).text
    page_content = BeautifulSoup(page_response, "html.parser")

    search_results = page_content.find(class_='srp-results').find_all(class_='s-item')

    for item in search_results:
        result.append(parse_item_ebay(item))

    return flask.jsonify(result)
