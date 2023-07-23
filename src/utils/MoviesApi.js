import { handleResponse } from "./utils";

export default class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers
  }

  getMovies() {
    return fetch(this._url, {
      headers: this._headers,
      method: 'GET',
    })
    .then((handleResponse))
  }
}