import { handleResponse } from "./utils";

export default class MainApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers
  }

  register ({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      })
    })
    .then(handleResponse)
  }

  login ({ email, password }) {
    return fetch(`${this._url}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(handleResponse)
  }

  getUserData (token = localStorage.getItem('jwt')) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`},
      method: 'GET',
    })
    .then(handleResponse)
  }

  updateUserData ({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(handleResponse)
  }

  addMovie (movieData) {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(movieData)
    })
    .then(handleResponse)
  }

  deleteMovie ({_id}) {
    return fetch(`${this._url}/movies/${_id}`, {
      headers: this._headers,
      method: 'DELETE',
    })
    .then(handleResponse)
  }

  getMovies () {
    return fetch(`${this._url}/movies`, {
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`},
      method: 'GET',
    })
    .then(handleResponse)
  }
}