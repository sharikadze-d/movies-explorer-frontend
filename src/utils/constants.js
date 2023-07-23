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
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  }
}

const moviesApiConfig = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  }
}

const EMAIL_PATTERN = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$";
const USERNAME_PATTERN = "^[a-zA-ZА-Яа-яёЁ \\s \\-]*$";

const ERROR_MESSAGE_DEFAULT = 'Введите данные в указанном формате.'
const ERROR_MESSAGE_USERNAME = 'Допустимые символы: латиница, кириллица, пробел, дефис'
const ERROR_MESSAGE_EMAIL = 'Введенное значение не соответсвует формату E-mail'

export {
  registerContent,
  loginContent,
  mainApiConfig,
  moviesApiConfig,
  EMAIL_PATTERN,
  USERNAME_PATTERN,
  ERROR_MESSAGE_DEFAULT,
  ERROR_MESSAGE_USERNAME,
  ERROR_MESSAGE_EMAIL
}