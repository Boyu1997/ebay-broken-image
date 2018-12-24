const api = "https://us-central1-boyu-io.cloudfunctions.net/ebay_broken_image"

export const search = (keyword, modelVersion) =>
  fetch(`${api}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "keyword": keyword,
      "amount": 80,
      "model_version": modelVersion,
     })
  }).then(res => res.json())
    .then(data => data)
