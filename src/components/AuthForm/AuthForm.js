import { useState } from 'react';

import './AuthForm.css';
import '../Opacity/Opacity.css'

import Logo from '../Logo/Logo';
import {registerContent, loginContent } from '../../utils/constants';

export default function AuthForm({ isRegister, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({ name, email, password })
  }

  const content = isRegister ? registerContent : loginContent;

  return (
    <section className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__form-wrapper">
          <Logo />
          <h1 className="auth-form__title">{content.titleText}</h1>

          <label className={`auth-form__label ${content.hiddenElement}`} htmlFor="name">Имя</label>
          <input
            type="text"
            className={`auth-form__input ${content.hiddenElement}`}
            id="name"
            placeholder="Введите имя"
            required
            value={name}
            onChange={handleChangeName}
          />
          <span className="name-error auth-form__error">OK</span>

          <label className="auth-form__label" htmlFor="email">E-mail</label>
          <input
            type="email"
            className="auth-form__input"
            id="email"
            placeholder="Введите E-mail"
            required
            value={email}
            onChange={handleChangeEmail}
          />
          <span className="email-error auth-form__error">OK</span>

          <label className="auth-form__label" htmlFor="password">Пароль</label>
          <input
            type="password"
            className="auth-form__input"
            id="password"
            placeholder="Введите пароль"
            required
            value={password}
            onChange={handleChangePassword}
          />
          <span className="password-error auth-form__error">Что-то пошло не так...</span>
        </div>

        <div className="auth-form__buttons-wrapper">
          <button type="submit" className="auth-form__submit opacity">{content.buttonText}</button>
          <p className="auth-form__question">{content.question}<a href={content.linkRef} className="auth-form__link opacity">{content.linkText}</a></p>
        </div>
      </form>
    </section>
  )
}