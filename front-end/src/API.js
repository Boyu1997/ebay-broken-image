const api = "https://us-central1-rolling-salmon.cloudfunctions.net/ebay_broken_image"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json',
  '': ''
}

export const search = (query) =>
  fetch(`${api}`, {
    method: 'POST',
    headers: { headers },
    body: JSON.stringify({
      "keyword": query,
      "amount": 5,
     })
  }).then(res => res.json())
    .then(data => data.data_set )


// export const search = (query) =>
//   fetch(api).then(res => res.json())
//     .then(data => data.data_set )
