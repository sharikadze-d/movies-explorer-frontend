import './AuthForm.css';
import '../Opacity/Opacity.css'

import Logo from '../Logo/Logo';
import {registerContent, loginContent } from '../../utils/constants';

export default function AuthForm({ isRegister }) {
  const content = isRegister ? registerContent : loginContent;

  return (
    <section className="auth-form">
      <form className="auth-form__form">
        <div className="auth-form__form-wrapper">
          <Logo />
          <h1 className="auth-form__title">{content.titleText}</h1>

          <label className={`auth-form__label ${content.hiddenElement}`} htmlFor="name">Имя</label>
          <input type="text" className={`auth-form__input ${content.hiddenElement}`} id="name" placeholder="Введите имя" required />
          <span className="name-error auth-form__error">OK</span>

          <label className="auth-form__label" htmlFor="email">E-mail</label>
          <input type="email" className="auth-form__input" id="email" placeholder="Введите E-mail" required />
          <span className="email-error auth-form__error">OK</span>

          <label className="auth-form__label" htmlFor="password">Пароль</label>
          <input type="password" className="auth-form__input" id="password" placeholder="Введите пароль" required />
          <span className="password-error auth-form__error auth-form__error_visible">Что-то пошло не так...</span>
        </div>

        <div className="auth-form__buttons-wrapper">
          <button type="submit" className="auth-form__submit opacity">{content.buttonText}</button>
          <p className="auth-form__question">{content.question}<a href={content.linkRef} className="auth-form__link opacity">{content.linkText}</a></p>
        </div>
      </form>
    </section>
  )
}