const api = "https://us-central1-rolling-salmon.cloudfunctions.net/ebay_broken_image"

// let token = localStorage.token
// if (!token)
//   token = localStorage.token = Math.random().toString(36).substr(-8)

// const headers = {
//   'Accept': 'application/json',
//   'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
//   'Content-Type': 'application/json',
// }

export const search = (query) =>
  fetch(`${api}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'mode': 'no-cors',
    },
    body: JSON.stringify({
      "keyword": query,
      "amount": 10,
     })
  }).then(res => res.json())
    .then(data => data )


// export const search = (query) =>
//   fetch(api).then(res => res.json())
//     .then(data => data.data_set )
