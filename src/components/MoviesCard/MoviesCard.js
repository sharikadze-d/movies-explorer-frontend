import './MoviesCard.css';
import '../Opacity/Opacity.css'

import { moviesApiConfig } from '../../utils/constants'
import { Link } from 'react-router-dom';

export default function MoviesCard({ movieData }) {
  const { nameRU, duration, image, trailerLink } = movieData;

  function minToHours(timeMin) {
    const hours = Math.floor(timeMin / 60);
    const minutes = timeMin - hours * 60;

    if (hours > 0) return `${hours}ч ${minutes}м`
      else return `${minutes}м`
  }

  return (
    <article className="card">
      <div>
      <Link to={trailerLink} className="card__image-container opacity" target="_blank">
        <img src={moviesApiConfig.baseUrl+image.url} alt="Обложка" className="card__image" />
      </Link>
      <div className="card__inner">
        <h3 className="card__name">{nameRU}</h3>
        <button className="card__like-btn opacity"></button>
      </div>
      </div>
      <p className="card__duration">{minToHours(duration)}</p>
    </article>
  )
}