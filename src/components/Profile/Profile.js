import './Profile.css';
import '../Opacity/Opacity.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useContext } from 'react';

export default function Profile() {
  const { name, email } = useContext(CurrentUserContext);
  return (
    <main className="profile">
      <section className="profile__content">
        <h2 className="profile__title">{`Привет, ${name}!`}</h2>
        <div className="profile__item">
          <p className="profile__value">Имя</p>
          <p className="profile__value">{name}</p>
        </div>
        <div className="profile__item">
          <p className="profile__value">E-mail</p>
          <p className="profile__value">{email}</p>
        </div>
        <button className="profile__button opacity" type="button">Редактировать</button>
        <button className="profile__button opacity profile__button_type_exit" type="button">Выйти из аккаунта</button>
      </section>
    </main>
  )
}