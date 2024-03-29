import './MoviesCardList.css';
import '../Opacity/Opacity.css'

import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  SCREEN_SIZE_BREAKPOINT_M,
  SCREEN_SIZE_BREAKPOINT_L,
  BASE_CARDS_AMOUNT_S,
  BASE_CARDS_AMOUNT_M,
  BASE_CARDS_AMOUNT_L,
  CARDS_ADD_STEP_S,
  CARDS_ADD_STEP_ML,
} from '../../utils/constants'

export default function MoviesCardList({
  isMoreButtonHidden,
  moviesData,
  isSavedMovies,
  mainApi,
  error,
  setError,
  savedMoviesList,
  setSavedMoviesList,
  savedMoviesListFiltred,
  setSavedMoviesListFiltred,
  savedMoviesSearchDone}) {

  const [width, setWidth] = useState(window.innerWidth);
  const [step, setStep] = useState(checkBaseStep());
  const [baseAmount, setBaseAmount] = useState(checkBaseAmount());
  const [buttonHidden, setButtonHidden] = useState(isMoreButtonHidden);
  const [moviesList, setMoviesList] = useState(moviesData);

  function handleResize() {
    setWidth(window.innerWidth);
    setStep(checkBaseStep());
    setBaseAmount(checkBaseAmount());
  }

  function checkBaseStep() {
    if (width <= SCREEN_SIZE_BREAKPOINT_M) return CARDS_ADD_STEP_S
      return CARDS_ADD_STEP_ML;
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  function checkBaseAmount() {
    if (width > SCREEN_SIZE_BREAKPOINT_L) return BASE_CARDS_AMOUNT_L
      else if (width > SCREEN_SIZE_BREAKPOINT_M) return BASE_CARDS_AMOUNT_M
        else return BASE_CARDS_AMOUNT_S;
  }

  function addCards() {
    setBaseAmount(baseAmount + step);
  }

  function checkButtonState(rendered, baseLength) {
    if (rendered >= baseLength) setButtonHidden(true)
      else setButtonHidden(false);
  }

  function handleLikeClick(movieData) {
    delete movieData._id
    delete movieData.__v
    mainApi.addMovie(movieData)
      .then((res) => {
        let bufferArray = moviesList;
        bufferArray = bufferArray.map(item => {
          if (item.movieId === res.movieId) return res
            else return item;
        })
        setMoviesList(bufferArray);
        getSavedMovies();
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
  }

  function handleDislikeClick(movieData) {
    mainApi.deleteMovie(movieData)
      .then(() => {
        getSavedMovies();
        savedMoviesListFiltred.length && deleteSavedMovieFromFiltredList(movieData)
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
  }

  function deleteSavedMovieFromFiltredList(movieData) {
    let updatedList = savedMoviesListFiltred;
    const index = updatedList.find(item => item.movieId === movieData.movieId)
    updatedList.splice(index, 1);
    setSavedMoviesListFiltred(updatedList)
    localStorage.setItem('savedMoviesListFiltred', JSON.stringify(updatedList));
  }

  useEffect(() => { 
    if (moviesData)
    checkButtonState(baseAmount, moviesData.length);
    if (isSavedMovies)
    setButtonHidden(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseAmount, isSavedMovies])

  useEffect(() => {
    if (isSavedMovies)
      mainApi.getMovies()
        .then(res => {
          setSavedMoviesList(res)
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSavedMovies, moviesData])

  function getSavedMovies() {
    mainApi.getMovies()
      .then((res) => {
        setSavedMoviesList(res)
        localStorage.setItem('savedMovies', JSON.stringify(res))
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
  }

  function checkLike(array, movie) {
    return array.some((item) => item.movieId === movie.movieId)
  }

  const moviesMarkup = () => {
    return (
      moviesData && moviesData.length ? 
        <div className="card-list__container">{
          (moviesList || moviesData).map((movie, index) => {
            if (index < baseAmount)
            return(
              <MoviesCard
                key={movie.movieId}
                movieData={movie}
                onLikeClick={handleLikeClick}
                onDislikeClick={handleDislikeClick}
                savedMovies={savedMoviesList}
                isLiked={checkLike(savedMoviesList, movie)}
              />
            )
            // eslint-disable-next-line array-callback-return
            return;
          })
        }</div> :
        <h2 className="card-list__error">Ничего не найдено</h2>
    )
  }

  const savedMoviesMarkup = () => {
    return (
      (!savedMoviesList.length || (savedMoviesSearchDone && !savedMoviesListFiltred.length)) ? 
      <h2 className="card-list__error">Ничего не найдено</h2> : 
      <div className="card-list__container">{
        ((savedMoviesSearchDone && savedMoviesListFiltred.length) ? savedMoviesListFiltred : savedMoviesList).map((movie, index) => {
          return(
            <MoviesCard
              key={movie.movieId}
              movieData={movie}
              onLlikeClick={handleLikeClick}
              onDislikeClick={handleDislikeClick}
              isSavedMovies={isSavedMovies}
              savedMovies={savedMoviesList}
              isLiked={checkLike(savedMoviesList, movie)}
            />
          )
        })
      }</div>
      
    )
  }

  return (
    <section className="card-list">
    {error ? 
      <h2 className="card-list__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</h2> :
      (isSavedMovies ? savedMoviesMarkup() : moviesMarkup())}
      <button
        type="button"
        className={`card-list__more-btn ${buttonHidden ? 'card-list__more-btn_hidden' : ''} opacity`}
        onClick={addCards}>
          Ещё
      </button>
    </section>    
  )
}