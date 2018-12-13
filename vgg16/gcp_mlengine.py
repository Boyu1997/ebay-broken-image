from oauth2client.client import GoogleCredentials
from googleapiclient import discovery

def ml_predict(instances, projectID, modelID, instancesID, versionID=None):

    # build a representation of the Google Cloud ML API
    ml = discovery.build('ml', 'v1')
    name = 'projects/{}/models/{}'.format(projectID, modelID)
    if versionID is not None:
        name += '/versions/{}'.format(versionID)

    # make the prediction request
    response = ml.projects().predict(
        name=name,
        body={'instances': instances}
    ).execute()

    if 'error' in response:
        raise RuntimeError(response['error'])

    return response['predictions']
