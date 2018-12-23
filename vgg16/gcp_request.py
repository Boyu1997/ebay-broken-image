from oauth2client.client import GoogleCredentials
from googleapiclient import discovery

# Clould ML identifier
project_id = 'rolling-salmon'
model_id = 'ebay_vgg16'
version_id = 'pool_5'


def ml_predict(instances):

    # build a representation of the Google Cloud ML API
    ml = discovery.build('ml', 'v1')
    name = 'projects/{}/models/{}/versions/{}'.format(project_id, model_id, version_id)

    # make the prediction request
    response = ml.projects().predict(
        name=name,
        body={'instances': instances}
    ).execute()

    # handle exception
    if 'error' in response:
        raise RuntimeError(response['error'])

    # return data
    return response['predictions']
