from oauth2client.client import GoogleCredentials
from googleapiclient import discovery

# Clould ML identifier
projectID = 'vertical-sunset-186521'
modelID = 'ebay_vgg16_mlengine'
versionID = 'v_2018_12_13_07_14'

def ml_predict(instances):

    # build a representation of the Google Cloud ML API
    ml = discovery.build('ml', 'v1')
    name = 'projects/{}/models/{}'.format(projectID, modelID)
    if versionID is not None:
        name += '/versions/{}'.format(versionID)

    # make the prediction request
    response = ml.projects().predict(
        name=name,
        body={'instances': [instances]}
    ).execute()

    # handle exception
    if 'error' in response:
        raise RuntimeError(response['error'])

    # return data
    return response['predictions']


def get_request(request, key, default=None):
    request_json = request.get_json()
    if request.args and key in request.args:
        data = request.args.get(key)
    elif request_json and key in request_json:
        data = request_json[key]
    else:
        data = default
    return data
