import './Footer.css';
import '../Opacity/Opacity.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__inner">
        <p className="footer__link">&copy; 2023</p>
        <ul className="footer__links">
          <li><a className="footer__link footer__link_list opacity" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
          <li><a className="footer__link footer__link_list opacity" href="https://github.com/sharikadze-d" target="_blank" rel="noreferrer">Github</a></li>
        </ul>
      </div>
    </footer>
  )
}