from urllib.request import urlopen
from urllib.parse import urlencode
from bs4 import BeautifulSoup

def ebay_url(keyword, page):
    ROOT = 'https://www.ebay.com/sch/i.html?'
    if page > 1:
        url = ROOT + urlencode({'_nkw': keyword, '_pgn': page})
    else:
        url = ROOT + urlencode({'_nkw': keyword})
    return url

def parse_item_ebay(item):
    product_link = item.find(class_="s-item__link").attrs['href']

    # image link exist in two form
    # if attribute 'data-src' exist, it contains image link
    # if not, 'src' contains image link
    img_link = item.find(class_='s-item__image-img')
    if img_link.has_attr('data-src'):
        img_link = img_link.attrs['data-src']
    else:
        img_link = img_link.attrs['src']

    price = item.find(class_="s-item__price").text
    name = item.find(class_="s-item__title").text

    return {
        'product_link': product_link,
        'img_link': img_link,
        'price': price,
        'name': name,
    }

def get_request(request, key, default):
    request_json = request.get_json()
    if request.args and key in request.args:
        data = request.args.get(key)
    elif request_json and key in request_json:
        data = request_json[key]
    else:
        data = default
    return data
