from PIL import Image
import requests
from io import BytesIO
import numpy as np
import flask
import json
from google.cloud import storage

from gcp_request import get_request

def ebay_pillow(request):

    # get keyword
    if request is not None:
        id = get_request(request, 'id')
        img_link = get_request(request, 'img_link')
        storage_id = get_request(request, 'storage_id')

    # download and resize image
    response = requests.get(img_link)
    img = Image.open(BytesIO(response.content))
    img = img.convert('RGB')
    img = img.resize((64,64))
    data = np.array(list(img.getdata()))
    data = data.reshape(64, 64, 3)
    data = data.tolist()

    # save image to cloud storage
    client = storage.Client()
    bucket = client.get_bucket('ebay_broken_image')
    blob = bucket.blob('image/{:s}.json'.format(storage_id))
    blob.upload_from_string(json.dumps(data))

    return
