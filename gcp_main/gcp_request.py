project_region = "us-central1"
project_id = "vertical-sunset-186521"

def cloud_function_url(function_name):
    url = "https://{:s}-{:s}.cloudfunctions.net/{:s}".format(project_region, project_id, function_name)
    return url

def get_request(request, key, default):
    request_json = request.get_json()
    if request.args and key in request.args:
        data = request.args.get(key)
    elif request_json and key in request_json:
        data = request_json[key]
    else:
        data = default
    return data