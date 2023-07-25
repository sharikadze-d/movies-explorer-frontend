import './Movies.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import Preloader from '../Preloader/Preloader';

export default function Movies({ moviesApi, isSavedMovies, mainApi }) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState({});
  const [lastSearchUpdated, setLastSearchUpdated] = useState(false);
  const [storageChecked, setStorageChecked] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  function moviesSearch(keyWord, checkboxStatus) {
    let result = [];
    setIsLoading(true);
    moviesApi.getMovies()
      .then((res) => {
        result = filterByKeyWord(res, keyWord);
        result = filterByDuration(result, checkboxStatus);
        result = result.map((movie) => {
          let image = movie.image;
          let id = movie.id;
          delete movie.id;
          delete movie.created_at;
          delete movie.updated_at;
          return {
            ...movie,
            image: image.url,
            thumbnail: image.formats.thumbnail.url,
            movieId: id,
          }
        })
        setLastSearch({ keyWord, checkboxStatus, result })
        setLastSearchUpdated(true);
        setError(false);
      })
      .then(() => localStorage.setItem('lastSearch', JSON.stringify(lastSearch)))
      .then(() => setIsLoading(false))
      .then(() => navigate('/movies'))
      .catch((err) => {
        console.log(err);
        setError(true);
      })
  }

  function filterByKeyWord(arr, keyWord) {
    return arr.filter(item => item.nameRU.toLowerCase().includes(keyWord.toLowerCase()) || item.nameEN.toLowerCase().includes(keyWord.toLowerCase()))
  }

  function filterByDuration(arr, isIncludesShorts) {
    if (isIncludesShorts) return arr
      else return arr.filter(item => item.duration > 40)
  }

  function checkLastSearch() {
    if (localStorage.getItem('lastSearch')) {
      setLastSearch(JSON.parse(localStorage.getItem('lastSearch')))
    }
  }

  useEffect(() => {
    if (!storageChecked) {
      checkLastSearch();
      setStorageChecked(true);
    } 
    if (lastSearchUpdated) {
      localStorage.setItem('lastSearch', JSON.stringify(lastSearch))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSearchUpdated, storageChecked])

  return (
    <main className="movies">
      <SearchForm onSearchClick={moviesSearch} lastSearch={lastSearch} />
      {
        lastSearch && Object.keys(lastSearch).length ?
        isLoading ? <Preloader isLoading={isLoading} /> :
        <MoviesCardList
          isMoreButtonHidden={false}
          moviesData={lastSearch.result}
          isSavedMovies={isSavedMovies}
          mainApi={mainApi}
          error={error}
          setError={setError}
        /> :
        <div className="movies__spacer"></div>
      }
    </main>
  )
}