import logo from '../../images/logo.svg';
import '../Opacity/Opacity.css'

export default function Logo() {
  return (
    <a href='/'><img src={logo} alt='Лого' className='opacity' /></a>
  )
}