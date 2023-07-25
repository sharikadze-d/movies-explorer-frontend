import './MoviesCard.css';
import '../Opacity/Opacity.css'

import { moviesApiConfig } from '../../utils/constants'
import { Link } from 'react-router-dom';

import { useState } from 'react';

export default function MoviesCard({ movieData, onLikeClick, onDislikeClick, isSavedMovies, savedMovies }) {
  // const { nameRU, duration, image, trailerLink } = movieData;
  const [liked, setLiked] = useState(checkWhichPage());
  console.log(movieData)

  function minToHours(timeMin) {
    const hours = Math.floor(timeMin / 60);
    const minutes = timeMin - hours * 60;

    if (hours > 0) return `${hours}ч ${minutes}м`
      else return `${minutes}м`
  }

  function checkWhichPage () {
    if (isSavedMovies) return true;
  }

  function handleLikeClick () {
    onLikeClick(movieData);
    setLiked(true);
  }

  function handleDislikeClick () {
    onDislikeClick(movieData);
    setLiked(false);
  }

  return (
    <article className="card">
      <div>
      <Link to={movieData.trailerLink} className="card__image-container opacity" target="_blank">
        <img src={moviesApiConfig.baseUrl+movieData.image} alt="Обложка" className="card__image" />
      </Link>
      <div className="card__inner">
        <h3 className="card__name">{movieData.nameRU}</h3>
        <button
          type="button"
          className={`card__like-btn opacity ${liked ? 'card__like-btn_active' : ''}`}
          onClick={liked ? handleDislikeClick : handleLikeClick}></button>
      </div>
      </div>
      <p className="card__duration">{minToHours(movieData.duration)}</p>
    </article>
  )
}