import './Header.css';
import logo from '../../images/logo.svg';
import account from '../../images/header-account.svg';

export default function Header({ isLoggedIn, onBurgerClick }) {
  const headerLinkClassName = `header__link ${isLoggedIn ? 'header__link_hidden' : ''}`

  const buttonsAuthorized = (

    <div className="header__inner">
      <a href="/movies" className={headerLinkClassName}>Фильмы</a>
      <a href="/saved-movies" className={headerLinkClassName}>Сохранённые фильмы</a>
      <a href="/profile" className={headerLinkClassName}>Аккаунт <img className="header__account-logo" src={account} alt="иконка аккаунт" /></a>
      <button className="header__burger-button" onClick={onBurgerClick}/>
    </div>
  )

  const buttonsUnauthorized = (
    <div className='header__inner'>
      <a href='/signup' className='header__link'>Регистрация</a>
      <a href='/signin' className='header__link header__link_type_button'>Войти</a>
    </div>
    
  )

  return (
    <header className={isLoggedIn ? 'header header_color_grey' : 'header'}>
      <div className='header__wrapper'>
        <a href='/'><img src={logo} alt='Лого' /></a>
        {isLoggedIn ? buttonsAuthorized : buttonsUnauthorized}
      </div>
    </header>
  );
}