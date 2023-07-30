import './Movies.css';
import { useState, useEffect } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import Preloader from '../Preloader/Preloader';

import { SHORTCUT_DURATION } from '../../utils/constants'

export default function Movies({ moviesApi, isSavedMovies, mainApi }) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState({});
  const [lastSearchSaved, setLastSearchSaved] = useState({});
  const [lastSearchUpdated, setLastSearchUpdated] = useState(false);
  const [storageChecked, setStorageChecked] = useState(false);
  const [error, setError] = useState(false);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [savedMoviesChecked, setSavedMoviesChecked] = useState(false);
  const [savedMoviesListFiltred, setSavedMoviesListFiltred] = useState([]);
  const [savedMoviesSearchDone, setSavedMoviesSearchDone] = useState(false);

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
      .then(() => {
        mainApi.getMovies()
          .then((res) => setSavedMoviesList(res))
      })
      .then(() => localStorage.setItem('lastSearch', JSON.stringify(lastSearch)))
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.log(err);
        setError(true);
      })
  }

  function savedMoviesSearch(keyWord, checkboxStatus) {
    setSavedMoviesSearchDone(true);
    let result = filterByKeyWord(savedMoviesList, keyWord);
    result = filterByDuration(result, checkboxStatus);
    setSavedMoviesListFiltred(result);
    setLastSearchSaved({ keyWord, checkboxStatus, result });
    localStorage.setItem('savedMoviesFiltred', JSON.stringify(result));
    localStorage.setItem('lastSearchSaved', JSON.stringify({ keyWord, checkboxStatus, result }));
  }

  function filterByKeyWord(arr, keyWord) {
    return arr.filter(item => item.nameRU.toLowerCase().includes(keyWord.toLowerCase()) || item.nameEN.toLowerCase().includes(keyWord.toLowerCase()))
  }

  function filterByDuration(arr, isIncludesShorts) {
    if (!isIncludesShorts) return arr
      else return arr.filter(item => item.duration < SHORTCUT_DURATION)
  }

  function checkLastSearch() {
    if (localStorage.getItem('lastSearch')) {
      setLastSearch(JSON.parse(localStorage.getItem('lastSearch')))
    }
  }

  function checkSavedMovies() {
    if (localStorage.getItem('savedMovies')) {
      setSavedMoviesList(JSON.parse(localStorage.getItem('savedMovies')))
    }
  }

  function checkSavedMoviesFiltred() {
    if (localStorage.getItem('savedMoviesFiltred')) {
      setSavedMoviesListFiltred(JSON.parse(localStorage.getItem('savedMoviesFiltred')))
    }
  }

  function checkLastSearchSaved() {
    if (localStorage.getItem('lastSearchSaved')) {
      setSavedMoviesListFiltred(JSON.parse(localStorage.getItem('lastSearchSaved')))
    }
  }

  useEffect(() => {
    if (!storageChecked) {
      checkLastSearch();
      checkLastSearchSaved();
      checkSavedMovies()
      checkSavedMoviesFiltred();
      setStorageChecked(true);
    } 
    if (lastSearchUpdated) {
      localStorage.setItem('lastSearch', JSON.stringify(lastSearch))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSearchUpdated, storageChecked, isSavedMovies, isLoading])

  useEffect(() => {
    if (!savedMoviesChecked)
    mainApi.getMovies()
    .then((res) => setSavedMoviesList(res))
    .then(() => setSavedMoviesChecked(true))
    .catch((err) => {
      console.log(err);
      setError(true);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMoviesChecked])

  return (
    <main className="movies">
      <SearchForm
        onSearchClick={isSavedMovies ? savedMoviesSearch : moviesSearch}
        lastSearch={isSavedMovies ? lastSearchSaved : lastSearch}
        isSavedMovies={isSavedMovies}
      />
      {
        (lastSearch && Object.keys(lastSearch).length) || isSavedMovies ?
        isLoading ? <Preloader isLoading={isLoading} /> :
        <MoviesCardList
          isMoreButtonHidden={false}
          moviesData={lastSearch.result}
          isSavedMovies={isSavedMovies}
          mainApi={mainApi}
          error={error}
          setError={setError}
          savedMoviesList={savedMoviesList}
          setSavedMoviesList={setSavedMoviesList}
          savedMoviesListFiltred={savedMoviesListFiltred}
          setSavedMoviesListFiltred={setSavedMoviesListFiltred}
          savedMoviesSearchDone={savedMoviesSearchDone}
        /> :
        <div className="movies__spacer"></div>
      }
    </main>
  )
}