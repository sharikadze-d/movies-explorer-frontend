import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ isMoreButtonHidden }) {

  const movieData = {
    nameRU: 'Криминальное чтиво',
    duration: 121,
    image: 'https://static.locals.md/2014/05/1-pulp-fiction.jpg'
  }

  return (
    <section className="card-list">
      <div className="card-list__container">
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
        <MoviesCard movieData={movieData} />
      </div>
      <div className={`card-list__spacer ${isMoreButtonHidden ? '' : 'card-list__spacer_hidden'}`} />
      <button
        type="button"
        className={`card-list__more-btn ${isMoreButtonHidden ? 'card-list__more-btn_hidden' : ''}`}>
          Ещё
      </button>
    </section>
  )
}