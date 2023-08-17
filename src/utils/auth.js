const baseUrl = 'https://auth.nomoreparties.co'

function getResponseData(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
}

export function auth(password, email) {
  return fetch(`https://auth.nomoreparties.co/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then(res => getResponseData(res))
}

export function authorization(password, email) {
  return fetch(`https://auth.nomoreparties.co/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then(res => getResponseData(res))
}

export function getUserData(token) {
  return fetch(`https://auth.nomoreparties.co/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    }})
    .then(res => getResponseData(res))
  }
