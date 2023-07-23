import './MoviesCardList.css';
import '../Opacity/Opacity.css'

import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { SCREEN_SIZE_BREAKPOINT_M, SCREEN_SIZE_BREAKPOINT_L } from '../../utils/constants'

export default function MoviesCardList({ isMoreButtonHidden, moviesData, isLoading }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [step, setStep] = useState(checkBaseStep());
  const [renderedCards, setRenderedCards] = useState([]);
  const [lastRendered, setLastRendered] = useState(0);
  const [baseAmount, setBaseAmount] = useState(checkBaseAmount());

  function renderCards(baseArray, step) {
    if (!baseArray) return;
    let newArray = renderedCards;
    baseArray.slice(lastRendered, lastRendered + step).forEach(card => {
      newArray.push(card);
    });
    setLastRendered(lastRendered + step);
    setRenderedCards(newArray)
  }

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
    renderCards(moviesData.result, baseAmount)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesData, renderedCards]);

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
    renderCards(moviesData.result, step)
  }

  return (
    isLoading ?
      <Preloader isLoading={isLoading} /> :
      <section className="card-list">
        <div className="card-list__container">{
          moviesData.result ? 
          renderedCards.map((movie) => {
            return(<MoviesCard key={movie.id} movieData={movie} />)
          }) :
          'Ничего не найдено'
        }</div>
        <div className={`card-list__spacer ${isMoreButtonHidden ? '' : 'card-list__spacer_hidden'}`} />
        <button
          type="button"
          className={`card-list__more-btn ${isMoreButtonHidden ? 'card-list__more-btn_hidden' : ''} opacity`}
          onClick={addCards}>
            Ещё
        </button>
      </section>    
  )
}