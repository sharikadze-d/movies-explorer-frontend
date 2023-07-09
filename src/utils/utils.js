const handleResponse = res => { //Обработка ответа
  return res.json()
    .then(res => {
      if (!res.message) return res;
      return Promise.reject(new Error(res.message));
    })
}

export {
  handleResponse,
}