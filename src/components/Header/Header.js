import './Header.css';
import '../Opacity/Opacity.css'

import account from '../../images/header-account.svg';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn, onBurgerClick }) {
  const headerLinkClassName = `header__link ${isLoggedIn ? 'header__link_hidden' : ''}`

  const buttonsAuthorized = (

    <div className="header__inner">
      <Link to="/movies" className={`${headerLinkClassName} opacity`}>Фильмы</Link>
      <Link to="/saved-movies" className={`${headerLinkClassName} opacity`}>Сохранённые фильмы</Link>
      <Link to="/profile" className={`${headerLinkClassName} opacity`}>Аккаунт <img className="header__account-logo" src={account} alt="иконка аккаунт" /></Link>
      <button className="header__burger-button opacity" onClick={onBurgerClick}/>
    </div>
  )

  const buttonsUnauthorized = (
    <div className='header__inner'>
      <Link to='/signup' className='header__link opacity'>Регистрация</Link>
      <Link to='/signin' className='header__link header__link_type_button opacity'>Войти</Link>
    </div>
    
  )

  return (
    <header className={isLoggedIn ? 'header header_color_grey' : 'header'}>
      <div className='header__wrapper'>
        <Logo />
        {isLoggedIn ? buttonsAuthorized : buttonsUnauthorized}
      </div>
    </header>
  );
}