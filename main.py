from beautifulsoup.main import ebay_beautifulsoup as beautifulsoup
# from vgg16.main import ebay_vgg16 as vgg16
from flask import request
import flask
import numpy as np
import pandas as pd

app = flask.Flask(__name__)

with app.test_request_context(method='POST'):
    # known keywords: ['hat', 'shirt']
    # known buggy keywords: ['phone', 'toy', 'cup', 'camera', 'calculator']
    request.args = {'keyword': 'shirt'}
    response = beautifulsoup(request)
    data = response.get_json()
    df = pd.DataFrame(data)
    print (df.head())
    # df.to_csv("test.csv")

#
# with app.test_request_context(method='POST'):
#     request.args = {'data': data}
#     response = vgg16(request, True)
#     feature = response.get_json()
#
# feature = np.array(feature)
# print (feature.shape)
