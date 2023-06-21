import './Header.css';
import logo from '../../images/logo.svg';

export default function Header({ isLoggedIn }) {
  isLoggedIn = false

  const buttonsAuthorized = (
    <p>Заглушка</p>
  )

  const buttonsUnauthorized = (
    <div className='header__inner'>
      <a href='/signup' className='header__link'>Регистрация</a>
      <a href='/signin' className='header__link header__link_type_button'>Войти</a>
    </div>
    
  )

  return (
    <header className='header'>
      <a href='/'><img src={logo} alt='Лого' /></a>
      {isLoggedIn ? buttonsAuthorized : buttonsUnauthorized}
    </header>
  );
}