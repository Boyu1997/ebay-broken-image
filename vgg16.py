from PIL import Image
import requests
from io import BytesIO

def get_image_data(image_link):
    response = requests.get(iamge_link)
    img = Image.open(BytesIO(response.content))
    data = list(img.getdata())
    return data

get_image_data("https://i.ebayimg.com/thumbs/images/m/mBiLStlJ3REaZ9KLFG6MSrQ/s-l225.jpg")
