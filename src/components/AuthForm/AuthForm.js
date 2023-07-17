import { useState, useEffect } from 'react';

import './AuthForm.css';
import '../Opacity/Opacity.css'

import Logo from '../Logo/Logo';
import {registerContent, loginContent } from '../../utils/constants';

export default function AuthForm({ isRegister, onSubmit, errMessage }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  
  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, password } = values;
    onSubmit({ name, email, password })
  }

  function handleChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  }
  
  useEffect(() => {
    setButtonState(isValid);
  }, [isValid])

  const content = isRegister ? registerContent : loginContent;

  return (
    <section className="auth-form">
      <form className="auth-form__form" onChange={handleChange}
      onSubmit={handleSubmit}
      >
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
            name="name"
            minLength="2"
            maxLength="30"
            disabled={isRegister ? false : true}
          />
          <span className={`auth-form__error ${errors.name ? 'auth-form__error_visible' : ''}`}>{errors.name || 'OK'}</span>

          <label className="auth-form__label" htmlFor="email">E-mail</label>
          <input
            type="email"
            className="auth-form__input"
            id="email"
            placeholder="Введите E-mail"
            required
            name="email"
          />
          <span className={`auth-form__error ${errors.email ? 'auth-form__error_visible' : ''}`}>
            {errors.email || 'OK'}
          </span>

          <label className="auth-form__label" htmlFor="password">Пароль</label>
          <input
            type="password"
            className="auth-form__input"
            id="password"
            placeholder="Введите пароль"
            required
            name="password"
            minLength="6"
            maxLength="30"
          />
          <span className={`auth-form__error ${errors.password ? 'auth-form__error_visible' : ''}`}>
            {errors.password || 'OK'}
          </span>
        </div>

        <div className="auth-form__buttons-wrapper">
          <span className={`auth-form__error auth-form__error_response ${errMessage ? 'auth-form__error_visible' : ''}`}>
            {errMessage || 'OK'}
          </span>
          <button
            type="submit"
            className="auth-form__submit opacity"
            disabled={!buttonState}>
              {content.buttonText}
          </button>
          <p className="auth-form__question">
            {content.question}<a href={content.linkRef} className="auth-form__link opacity">{content.linkText}</a>
          </p>
        </div>
      </form>
    </section>
  )
}