import './MoviesCard.css';
import '../Opacity/Opacity.css'

import { moviesApiConfig } from '../../utils/constants'
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

export default function MoviesCard({ movieData, onLikeClick, onDislikeClick, isSavedMovies, savedMovies, isLiked, _id }) {
  const [liked, setLiked] = useState(isLiked);
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState(getId(movieData));

  function minToHours(timeMin) {
    const hours = Math.floor(timeMin / 60);
    const minutes = timeMin - hours * 60;

    if (hours > 0) return `${hours}ч ${minutes}м`
      else return `${minutes}м`
  }

  function handleLikeClick () {
    let data = movieData;
    delete data._id;
    delete data.owner;
    onLikeClick(data);
    setLiked(true);
  }

  function handleDislikeClick () {
    const cardId = id || movieData._id
    onDislikeClick({ _id: cardId});
    setLiked(false);
  }

  useEffect(() => {
    setLiked(isLiked)
  }, [isLiked])

  function getId(movieData) {
    if (liked) {
      const movie = savedMovies.find((item => item.movieId === movieData.movieId))
      return (movie ? movie._id : undefined);
    }
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
          className={`card__like-btn opacity ${liked ? 'card__like-btn_active' : ''} ${isSavedMovies ? 'card__like-btn_type_delete' : ''}`}
          onClick={isSavedMovies ? handleDislikeClick : liked ? handleDislikeClick : handleLikeClick  }></button>
      </div>
      </div>
      <p className="card__duration">{minToHours(movieData.duration)}</p>
    </article>
  )
}