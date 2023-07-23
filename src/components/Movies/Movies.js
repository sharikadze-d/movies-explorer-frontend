import './Movies.css';
import { useState, useEffect } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function Movies({ api }) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState({});
  const [lastSearchUpdated, setLastSearchUpdated] = useState(false);
  const [storageChecked, setStorageChecked] = useState(false);

  function moviesSearch(keyWord, checkboxStatus) {
    let result = [];
    setIsLoading(true);
    api.getMovies()
      .then(async (res) => {
        result = filterByKeyWord(res, keyWord);
        result = filterByDuration(result, checkboxStatus);
        setLastSearch({ keyWord, checkboxStatus, result })
        setLastSearchUpdated(true);
      })
      .then(() => localStorage.setItem('lastSearch', JSON.stringify(lastSearch)))
      .then(() => setIsLoading(false))
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

  console.log(lastSearch)

  return (
    <main>
      <SearchForm onSearchClick={moviesSearch} lastSearch={lastSearch} />
      <Preloader isLoading={isLoading}/>
      <MoviesCardList isMoreButtonHidden={false}/>
    </main>
  )
}