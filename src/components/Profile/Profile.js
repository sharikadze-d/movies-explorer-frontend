import './Profile.css';
import '../Opacity/Opacity.css'

import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useContext } from 'react';

import {
  EMAIL_PATTERN,
  USERNAME_PATTERN,
  ERROR_MESSAGE_DEFAULT,
  ERROR_MESSAGE_USERNAME,
  ERROR_MESSAGE_EMAIL,
} from '../../utils/constants';

export default function Profile({ onSubmit, errMessage, onLogout }) {
  const nameSaved = useContext(CurrentUserContext).name;
  const emailSaved = useContext(CurrentUserContext).email;
  const [nameCurrent, setNameCurrent] = useState(useContext(CurrentUserContext).name);
  const [emailCurrent, setEmailCurrent] = useState(useContext(CurrentUserContext).email);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  
  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, password } = values;
    onSubmit({ name, email, password })
  }

  function handleChangeName(evt) {
    setNameCurrent(evt.target.value);
  } 

  function handleChangeEmail(evt) {
    setEmailCurrent(evt.target.value);
  } 

  function handleChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });

    //Костыль:)
    if (!target.validity.valid && target.validationMessage === ERROR_MESSAGE_DEFAULT && name === 'name') {
      setErrors({ ...errors, name: ERROR_MESSAGE_USERNAME });
    }
    if (!target.validity.valid && target.validationMessage === ERROR_MESSAGE_DEFAULT && name === 'email') {
      setErrors({ ...errors, email: ERROR_MESSAGE_EMAIL });
    }

    setIsValid(target.closest("form").checkValidity());
  }

  useEffect(() => {
    if (nameCurrent === nameSaved && emailCurrent === emailSaved) setIsValid(false);
    if (nameCurrent === nameSaved && emailCurrent === '') setIsValid(false);
    if (nameCurrent === '' && emailCurrent === emailSaved) setIsValid(false);
    if (nameCurrent === '' && emailCurrent === '') setIsValid(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameCurrent, emailCurrent])
  
  useEffect(() => {
    setButtonState(isValid);
  }, [isValid])
  return (
    <main className="profile">
      <form className="profile__content" onSubmit={handleSubmit} onChange={handleChange}>
        <h2 className="profile__title">{`Привет, ${nameSaved}!`}</h2>
        <div className="profile__item">
          <label className="profile__label">Имя</label>
          <input
            className="profile__input"
            id="name"
            name="name"
            value={nameCurrent}
            onChange={handleChangeName}
            minLength="2"
            maxLength="30"
            pattern={USERNAME_PATTERN}
            type="text"
          ></input>
        </div>
        <span className={`profile__error ${errors.name ? 'profile__error_visible' : ''}`}>{errors.name || 'OK'}</span>
        <div className="profile__item">
          <label className="profile__label">E-mail</label>
          <input
            className="profile__input"
            id="email"
            value={emailCurrent}
            onChange={handleChangeEmail}
            type="email"
            name="email"
            pattern={EMAIL_PATTERN}
          ></input>
        </div>
        <span className={`profile__error ${errors.email ? 'profile__error_visible' : ''}`}>{errors.email || 'OK'}</span>
        <div className={`profile__error profile__error_response ${errMessage ? 'profile__error_visible' : ''}`}>
            {errMessage || 'OK'}
          </div>
        <button className="profile__button opacity" type="submit" disabled={!buttonState}>Редактировать</button>
        <button
          className="profile__button opacity profile__button_type_exit"
          type="button"
          onClick={onLogout}>
            Выйти из аккаунта
        </button>
      </form>
    </main>
  )
}