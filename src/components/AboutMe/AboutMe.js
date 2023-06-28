import './AboutMe.css';
import photo from '../../images/about-me-photo.jpg';

export default function AboutMe() {
  return (
    <article className="about-me">
      <div className="about-me__wrapper">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__info">
          <div className="about-me__inner">
            <div>
              <h3 className="about-me__name">Денис</h3>
              <h4 className="about-me__career">Фронтенд-разработчик, 29 лет</h4>
              <p className="about-me__text">Я из Московской области. За свою жизнь поработал в самых разных отраслях. В данный момент работаю системным администратором в центральной районной больнице. Сейчас нахожусь в поиске работы или подработки в области веб-разработки.</p>
            </div>
            <a className="about-me__git" href="https://github.com/sharikadze-d">Github</a>
          </div>
          <img className="about-me__photo" src={photo} alt="Фото автора" />
        </div>
        <p className="about-me__caption">Портфолио</p>
        <ul className="about-me__portfolio">
          <li className="about-me__portfolio-item">
            <a className="about-me__link" href="https://github.com/sharikadze-d/how-to-learn">Статичный сайт</a>
            <a className="about-me__arrow" href="https://github.com/sharikadze-d/how-to-learn">↗</a>
          </li>
          <li className="about-me__portfolio-item">
            <a className="about-me__link" href="https://github.com/sharikadze-d/russian-travel">Адаптивный сайт</a>
            <a className="about-me__arrow" href="https://github.com/sharikadze-d/russian-travel">↗</a>
          </li>
          <li className="about-me__portfolio-item">
            <a className="about-me__link" href="https://github.com/sharikadze-d/react-mesto-api-full-gha">Одностраничное приложение</a>
            <a className="about-me__arrow" href="https://github.com/sharikadze-d/react-mesto-api-full-gha">↗</a>
          </li>
        </ul>
      </div>
    </article>
  )
}