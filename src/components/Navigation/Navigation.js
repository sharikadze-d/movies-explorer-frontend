import './Navigation.css';
import account from '../../images/header-account.svg';

import { Link } from 'react-router-dom';

export default function Navigation({ isOpened, onCloseClick }) {
  return (
    <div className={`burger ${isOpened ? 'burger_opened' : ''}`}>
      <nav className="burger__container">
        <button className="burger__close-btn" onClick={onCloseClick} />
        <ul className="burger__link-list">
          <div className="burger__inner">
            <li className="burger__list-item"><Link to="/" className="burger__link" onClick={onCloseClick}>Главная</Link></li>
            <li className="burger__list-item"><Link to="/movies" className="burger__link burger__link_active" onClick={onCloseClick}>Фильмы</Link></li>
            <li className="burger__list-item"><Link to="/saved-movies" className="burger__link" onClick={onCloseClick}>Сохранённые фильмы</Link></li>
          </div>
          <li className="burger__list-item"><Link to="/profile" className="burger__link" onClick={onCloseClick}>Аккаунт <img className="burger__account-logo" src={account} alt="иконка аккаунт" /></Link></li>
        </ul>
      </nav>
    </div>
  )
}