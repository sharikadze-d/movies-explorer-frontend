import { useState, useCallback, useEffect } from 'react';

import './AuthForm.css';
import '../Opacity/Opacity.css'

import Logo from '../Logo/Logo';
import {registerContent, loginContent } from '../../utils/constants';

export default function AuthForm({ isRegister, onSubmit }) {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // function handleChangeName(evt) {
  //   setName(evt.target.value);
  // }

  // function handleChangeEmail(evt) {
  //   setEmail(evt.target.value);
  // }

  // function handleChangePassword(evt) {
  //   setPassword(evt.target.value);
  // }

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   onSubmit({ name, email, password })
  // }

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [buttonState, setButtonState] = useState(false);

  function handleChange(evt) {
    // setValues({
    //   ...values,
    //   name: evt.target.name.value,
    //   email: evt.target.email.value,
    //   password: evt.target.password.value,
    // })

    // setErrors({
    //   ...errors,
    //   name: evt.target.name.validationMessage,
    //   email: evt.target.email.validationMessage,
    //   password: evt.target.password.validationMessage,
    // })

    // setIsValid(evt.target.closest('form')).checkValidity()

    
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    
    console.log(values);
    console.log(errors);
    console.log(isValid);

    // isValid ? setButtonState(true) : setButtonState(false)
  }
  
  // const resetForm = useCallback(
  //   (newValues = {}, newErrors = {}, newIsValid = false) => {
  //     setValues(newValues);
  //     setErrors(newErrors);
  //     setIsValid(newIsValid);
  //   },
  //   [setValues, setErrors, setIsValid]
  // );

  useEffect(() => {
    console.log('!!!')
    setButtonState(isValid);
  }, [isValid])

  console.log(('.auth-form__submit'));

  const content = isRegister ? registerContent : loginContent;

  return (
    <section className="auth-form">
      <form className="auth-form__form" onChange={handleChange}
      // onSubmit={handleSubmit}
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
            // value={name}
            // onChange={handleChangeName}
            name="name"
          />
          <span className="name-error auth-form__error">OK</span>

          <label className="auth-form__label" htmlFor="email">E-mail</label>
          <input
            type="email"
            className="auth-form__input"
            id="email"
            placeholder="Введите E-mail"
            required
            name="email"
            // value={email}
            // onChange={handleChangeEmail}
          />
          <span className={`auth-form__error ${errors.email ? 'auth-form__error_visible' : ''}`}>{errors.email || 'OK'}</span>
'
          <label className="auth-form__label" htmlFor="password">Пароль</label>
          <input
            type="password"
            className="auth-form__input"
            id="password"
            placeholder="Введите пароль"
            required
            name="password"
            // value={password}
            // onChange={handleChangePassword}
          />
          <span className="password-error auth-form__error">Что-то пошло не так...</span>
        </div>

        <div className="auth-form__buttons-wrapper">
          <span className="auth-form__validation-message"></span>
          <button
            type="submit"
            className="auth-form__submit opacity"
            disabled={!buttonState}>
              {content.buttonText}
          </button>
          <p className="auth-form__question">{content.question}<a href={content.linkRef} className="auth-form__link opacity">{content.linkText}</a></p>
        </div>
      </form>
    </section>
  )
}