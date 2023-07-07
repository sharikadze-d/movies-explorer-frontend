import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies() {
  return (
    <main>
      <SearchForm />
      <Preloader />
      <MoviesCardList isMoreButtonHidden={true}/>
    </main>
  )
}