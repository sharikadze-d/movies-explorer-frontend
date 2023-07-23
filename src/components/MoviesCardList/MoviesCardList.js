import './MoviesCardList.css';
import '../Opacity/Opacity.css'

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
        
      </div>
      <div className={`card-list__spacer ${isMoreButtonHidden ? '' : 'card-list__spacer_hidden'}`} />
      <button
        type="button"
        className={`card-list__more-btn ${isMoreButtonHidden ? 'card-list__more-btn_hidden' : ''} opacity`}>
          Ещё
      </button>
    </section>
  )
}