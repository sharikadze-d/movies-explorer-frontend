import './MoviesCard.css';

export default function MoviesCard({ movieData }) {
  const { nameRU, duration, image} = movieData;

  function minToHours(timeMin) {
    const hours = Math.floor(timeMin / 60);
    const minutes = timeMin - hours * 60;

    if (hours > 0) return `${hours}ч ${minutes}м`
      else return `${minutes}м`
  }

  return (
    <article className="card">
      <div className="card__image-container">
        <img src={image} alt="Обложка" className="card__image" />
      </div>
      <div className="card__inner">
        <h3 className="card__name">{nameRU}</h3>
        <div className="card__like-btn"></div>
      </div>
      <p className="card__duration">{minToHours(duration)}</p>
    </article>
  )
}