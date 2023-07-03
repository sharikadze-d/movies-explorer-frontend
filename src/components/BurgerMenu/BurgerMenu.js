import './BurgerMenu.css';
import account from '../../images/header-account.svg';

export default function BurgerMenu({ isOpened, onCloseClick }) {
  return (
    <div className={`burger ${isOpened ? 'burger_opened' : ''}`}>
      <nav className="burger__container">
        <button className="burger__close-btn" onClick={onCloseClick} />
        <ul className="burger__link-list">
          <div className="burger__inner">
            <li className="burger__list-item"><a href="/" className="burger__link">Главная</a></li>
            <li className="burger__list-item"><a href="/movies" className="burger__link burger__link_active">Фильмы</a></li>
            <li className="burger__list-item"><a href="/saved-movies" className="burger__link">Сохранённые фильмы</a></li>
          </div>
          <li className="burger__list-item"><a href="/profile" className="burger__link">Аккаунт <img className="burger__account-logo" src={account} alt="иконка аккаунт" /></a></li>
        </ul>
      </nav>
    </div>
  )
}