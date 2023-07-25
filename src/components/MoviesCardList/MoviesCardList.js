import './MoviesCardList.css';
import '../Opacity/Opacity.css'

import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { SCREEN_SIZE_BREAKPOINT_M, SCREEN_SIZE_BREAKPOINT_L } from '../../utils/constants'

export default function MoviesCardList({ isMoreButtonHidden, moviesData, isSavedMovies, mainApi}) {
  const [width, setWidth] = useState(window.innerWidth);
  const [step, setStep] = useState(checkBaseStep());
  const [baseAmount, setBaseAmount] = useState(checkBaseAmount());
  const [buttonHidden, setButtonHidden] = useState(isMoreButtonHidden);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [cardDeleted, setCardDeleted] = useState(false);

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
    console.log(movieData)
    mainApi.addMovie(movieData)
      .then(() => {
        // mainApi.getMovies()
        // .then((res) => setSavedMoviesList(res))
        getSavedMovies();
      })
      .catch(err => console.log(err.message))
  }

  function handleDislikeClick(movieData) {
    mainApi.deleteMovie(movieData)
      // .then((res) => removeSavedMovie(res))
      // .then(() => setCardDeleted(!cardDeleted))
      .then(() => {
        // mainApi.getMovies()
        // .then((res) => setSavedMoviesList(res))
        getSavedMovies();
      })
      .catch(err => console.log(err.message))
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
          console.log(res)
          setSavedMoviesList(res)
        })
        .catch((err) => setSavedMoviesList(err.message))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSavedMovies, cardDeleted])

  useEffect(() => {

  })

  function getSavedMovies() {
    mainApi.getMovies()
      .then((res) => setSavedMoviesList(res))
      .catch((err) => console.log(err))
  }

  function removeSavedMovie({_id}) {
    savedMoviesList.splice(savedMoviesList.findIndex((item) => item._id === _id), 1)
  }

  const moviesMarkup = () => {
    return (
      moviesData && moviesData.length ? 
        <div className="card-list__container">{
          moviesData.map((movie, index) => {
            if (index < baseAmount)
            return(
              <MoviesCard
                key={movie.movieId}
                movieData={movie}
                onLikeClick={handleLikeClick}
                onDislikeClick={handleDislikeClick}
                savedMovies={savedMoviesList}
              />
            )
            // eslint-disable-next-line array-callback-return
            return;
          })
        }</div> :
        <h2 className="card-list__not-found">Ничего не найдено</h2>
    )
  }

  const savedMoviesMarkup = () => {
    return (
      savedMoviesList && savedMoviesList.length ? 
      <div className="card-list__container">{
       savedMoviesList.map((movie, index) => {
          return(
            <MoviesCard
              key={index}
              movieData={movie}
              onLlikeClick={handleLikeClick}
              onDislikeClick={handleDislikeClick}
              isSavedMovies={isSavedMovies}
              savedMovies={savedMoviesList}
            />
          )
        })
      }</div> :
      <h2 className="card-list__not-found">Ничего не найдено</h2>
    )
  }

  return (
    <section className="card-list">
    {isSavedMovies ? savedMoviesMarkup() : moviesMarkup()}
      <button
        type="button"
        className={`card-list__more-btn ${buttonHidden ? 'card-list__more-btn_hidden' : ''} opacity`}
        onClick={addCards}>
          Ещё
      </button>
    </section>    
  )
}