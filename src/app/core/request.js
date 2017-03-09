import Promise from "bluebird"

const wrap = (data) => ({
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data),
})

export default (url, data) => 
  fetch(url, wrap(data))
  .then(res => Promise.all([
      res.json(),
      Promise.resolve(res.status),
    ]))
  .then(([json, status]) => Promise.resolve({
    ...json,
    status,
  }))
