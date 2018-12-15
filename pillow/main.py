from PIL import Image
import requests
from io import BytesIO
import numpy as np
import flask

from gcp_request import get_request

def ebay_pillow(request):
    # default keyward for testing
    id = "1"
    img_link = "https://i.ebayimg.com/thumbs/images/m/m6ipZBqkTZxwJ0lPsG9UsOQ/s-l225.jpg"

    # if keyward passed by the request object, update keyward
    if request is not None:
        # get keyword
        id = get_request(request, 'id', id)
        img_link = get_request(request, 'img_link', img_link)

    response = requests.get(img_link)
    img = Image.open(BytesIO(response.content))
    img = img.convert('RGB')
    img = img.resize((64,64))
    data = np.array(list(img.getdata()))
    data = data.reshape(64, 64, 3)
    data = data.tolist()

    return flask.jsonify({
        "id": id,
        "img_data": data,
    })
