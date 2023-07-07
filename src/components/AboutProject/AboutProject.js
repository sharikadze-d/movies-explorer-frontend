import './AboutProject.css';

export default function AboutProject() {
  return (
    <article className="about-project">
      <div className="about-project__wrapper">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__info">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__item">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className="about-project__item">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about-project__time-bar">
          <div className="about-project__bar">1 неделя</div>
          <div className="about-project__bar">4 недели</div>
          <p className="about-project__caption">Back-end</p>
          <p className="about-project__caption">Front-end</p>
        </div>
      </div>
    </article>
  )
}