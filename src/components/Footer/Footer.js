import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__inner">
        <p className="footer__link">&copy; 2023</p>
        <ul className="footer__links">
          <li><a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a></li>
          <li><a className="footer__link" href="https://github.com/sharikadze-d">Github</a></li>
        </ul>
      </div>
    </footer>
  )
}