import './AboutMe.css';
import photo from '../../images/about-me-photo.jpg';

export default function AboutMe() {
  return (
    <article className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__inner">
          <h3 className="about-me__name">Денис</h3>
          <h4 className="about-me__career">Фронтенд-разработчик, 29 лет</h4>
          <p className="about-me__text">Я из Московской области. За свою жизнь поработал в самых разных отраслях. В данный момент работаю системным администратором в центральной районной больнице. Сейчас нахожусь в поиске работы или подработки в области веб-разработки</p>
          <a className="about-me__git" href="https://github.com/sharikadze-d">Github</a>
        </div>
        <img className="about-me__photo" src={photo} alt="Фото автора" />
      </div>
      <p className="about-me__caption">Портфолио</p>
      <ul className="about-me__portfolio">
        <li className="about-me__portfolio-item">
          <a className="about-me__link" href="">Статичный сайт</a>
          <a className="about-me__arrow" href="">↗</a>
        </li>
        <li className="about-me__portfolio-item">
          <a className="about-me__link" href="https://sharikadze-d.github.io/russian-travel/">Адаптивный сайт</a>
          <a className="about-me__arrow" href="https://sharikadze-d.github.io/russian-travel/">↗</a>
        </li>
        <li className="about-me__portfolio-item">
          <a className="about-me__link" href="">Одностраничное приложение</a>
          <a className="about-me__arrow" href="">↗</a>
        </li>
      </ul>
    </article>
  )
}