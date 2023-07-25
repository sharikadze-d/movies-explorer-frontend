import './MoviesCardList.css';
import '../Opacity/Opacity.css'

import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { SCREEN_SIZE_BREAKPOINT_M, SCREEN_SIZE_BREAKPOINT_L } from '../../utils/constants'

export default function MoviesCardList({
  isMoreButtonHidden,
  moviesData,
  isSavedMovies,
  mainApi,
  error,
  setError,
  savedMoviesList,
  setSavedMoviesList,
  savedMoviesListFiltred}) {

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
    if (width <= SCREEN_SIZE_BREAKPOINT_M) return 2
      return 4;
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  function checkBaseAmount() {
    if (width > SCREEN_SIZE_BREAKPOINT_L) return 12
      else if (width > SCREEN_SIZE_BREAKPOINT_M) return 8
        else return 5;
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
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
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
  }, [isSavedMovies])

  function getSavedMovies() {
    mainApi.getMovies()
      .then((res) => setSavedMoviesList(res))
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
      savedMoviesList && savedMoviesList.length ? 
      <div className="card-list__container">{
        ((savedMoviesListFiltred && savedMoviesListFiltred.length) ? savedMoviesListFiltred : savedMoviesList).map((movie, index) => {
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
      }</div> :
      <h2 className="card-list__error">Ничего не найдено</h2>
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