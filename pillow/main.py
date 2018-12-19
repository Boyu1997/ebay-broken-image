from PIL import Image
import requests
from io import BytesIO
import numpy as np
import flask
import json
from google.cloud import storage

from gcp_request import get_request

def ebay_pillow(request):
    # default keyward for testing
    id = "test"
    img_link = "https://i.ebayimg.com/thumbs/images/m/m6ipZBqkTZxwJ0lPsG9UsOQ/s-l225.jpg"
    storage_id = "test"

    # if keyward passed by the request object, update keyward
    if request is not None:
        # get keyword
        id = get_request(request, 'id', id)
        img_link = get_request(request, 'img_link', img_link)
        storage_id = get_request(request, 'storage_id', img_link)

    response = requests.get(img_link)
    img = Image.open(BytesIO(response.content))
    img = img.convert('RGB')
    img = img.resize((64,64))
    data = np.array(list(img.getdata()))
    data = data.reshape(64, 64, 3)
    data = data.tolist()

    client = storage.Client()

    bucket = client.get_bucket('ebay_broken_image')
    blob = bucket.blob('{}/img_{}.json'.format(storage_id, id))
    blob.upload_from_string(json.dumps(data))

    return "200"
