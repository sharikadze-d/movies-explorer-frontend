import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {

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
      <button type="button" className="card-list__more-btn">Ещё</button>
    </section>
  )
}