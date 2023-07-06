import './AuthForm.css';

import Logo from '../Logo/Logo';
import {registerContent, loginContent } from '../../utils/constants';

export default function AuthForm({ isRegister }) {
  isRegister = true;

  const content = isRegister ? registerContent : loginContent;

  return (
    <section className="auth-form">
      <form className="auth-form__form">
        <div className="auth-form__form-wrapper">
          <Logo />
          <h1 className="auth-form__title">{content.titleText}</h1>

          <label className={`auth-form__label ${content.hiddenElement}`} for="name">Имя</label>
          <input type="text" className={`auth-form__input ${content.hiddenElement}`} id="name" placeholder="Имя" required />
          <span className="name-error auth-form__error">Что-то пошло не так...</span>

          <label className="auth-form__label" for="email">E-mail</label>
          <input type="email" className="auth-form__input" id="email" placeholder="E-mail" required />
          <span className="email-error auth-form__error">Что-то пошло не так...</span>

          <label className="auth-form__label" for="password">Пароль</label>
          <input type="password" className="auth-form__input" id="password" placeholder="Пароль" required />
          <span className="password-error auth-form__error">Что-то пошло не так...</span>
        </div>

        <div className="auth-form__buttons-wrapper">
          <button type="submit" className="auth-form__submit">{content.buttonText}</button>
          <p className="auth-form__question">{content.question}<a href={content.linkRef} className="auth-form__link">{content.linkText}</a></p>
        </div>
      </form>
    </section>
  )
}