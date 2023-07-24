import './MoviesCardList.css';
import '../Opacity/Opacity.css'

import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { SCREEN_SIZE_BREAKPOINT_M, SCREEN_SIZE_BREAKPOINT_L } from '../../utils/constants'

export default function MoviesCardList({ isMoreButtonHidden, moviesData, isLoading }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [step, setStep] = useState(checkBaseStep());
  const [baseAmount, setBaseAmount] = useState(checkBaseAmount());
  const [buttonHidden, setButtonHidden] = useState(isMoreButtonHidden);
 
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

  useEffect(() => { 
    if (moviesData)
    checkButtonState(baseAmount, moviesData.length);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseAmount])

  return (
    <section className="card-list">
    {moviesData && moviesData.length ? 
      <div className="card-list__container">{
        moviesData.map((movie, index) => {
          if (index < baseAmount)
          return(<MoviesCard key={movie.id} movieData={movie} />)
          // eslint-disable-next-line array-callback-return
          return;
        })
      }</div> :
      <h2 className="card-list__not-found">Ничего не найдено</h2>}
      <button
        type="button"
        className={`card-list__more-btn ${buttonHidden ? 'card-list__more-btn_hidden' : ''} opacity`}
        onClick={addCards}>
          Ещё
      </button>
    </section>    
  )
}