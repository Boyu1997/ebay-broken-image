from google.cloud import storage
client = storage.Client()
# https://console.cloud.google.com/storage/browser/[bucket-id]/
bucket = client.get_bucket('ebay_broken_image')
blob = bucket.get_blob('ml_vgg16/v_2018_12_14_17_00/variables/variables.index')
print(blob.download_as_string())
