from PIL import Image
import requests
from io import BytesIO, StringIO
import numpy as np
import json

from google.cloud import storage
client = storage.Client()
# https://console.cloud.google.com/storage/browser/[bucket-id]/

img_link = "https://i.ebayimg.com/thumbs/images/m/m5TQv_yesoMa8ytgy1YBHlQ/s-l225.jpg"
id = "1"

response = requests.get(img_link)
img = Image.open(BytesIO(response.content))
img = img.convert('RGB')
img = img.resize((64,64))
data = np.array(list(img.getdata()))
data = data.reshape(64, 64, 3)
data = data.tolist()

bucket = client.get_bucket('ebay_broken_image')
blob = bucket.blob('data/{}.json'.format(id))
blob.upload_from_string(json.dumps(data))
# f = StringIO(json.dumps(data))
# blob.upload_from_file(f)
