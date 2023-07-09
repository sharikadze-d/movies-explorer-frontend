const registerContent = {
  titleText: 'Добро пожаловать!',
  hiddenElement: '',
  buttonText: 'Зарегистрироваться',
  question: 'Уже зарегистрированы?',
  linkText: 'Войти',
  linkRef: '/signin',
}

const loginContent = {
  titleText: 'Рады видеть!',
  hiddenElement: 'auth-form__hidden-element',
  buttonText: 'Войти',
  question: 'Ещё не зарегистрированы?',
  linkText: 'Регистрация',
  linkRef: '/signup',
}

const mainApiConfig = {
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
}

export {
  registerContent,
  loginContent,
  mainApiConfig,
}