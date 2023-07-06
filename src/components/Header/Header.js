import './Header.css';
import '../Opacity/Opacity.css'

import account from '../../images/header-account.svg';
import Logo from '../Logo/Logo';

export default function Header({ isLoggedIn, onBurgerClick }) {
  const headerLinkClassName = `header__link ${isLoggedIn ? 'header__link_hidden' : ''}`

  const buttonsAuthorized = (

    <div className="header__inner">
      <a href="/movies" className={`${headerLinkClassName} opacity`}>Фильмы</a>
      <a href="/saved-movies" className={`${headerLinkClassName} opacity`}>Сохранённые фильмы</a>
      <a href="/profile" className={`${headerLinkClassName} opacity`}>Аккаунт <img className="header__account-logo" src={account} alt="иконка аккаунт" /></a>
      <button className="header__burger-button opacity" onClick={onBurgerClick}/>
    </div>
  )

  const buttonsUnauthorized = (
    <div className='header__inner'>
      <a href='/signup' className='header__link opacity'>Регистрация</a>
      <a href='/signin' className='header__link header__link_type_button opacity'>Войти</a>
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