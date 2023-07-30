import './SearchForm.css';
import '../Opacity/Opacity.css'

import { useState, useEffect } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({ onSearchClick, lastSearch, isSavedMovies }) {
  const [fieldValue, setFieldValue] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  function handleChangeInput(evt) {
    setFieldValue(evt.target.value);
  }

  function handleChangeCheckbox() {
    setCheckboxStatus(!checkboxStatus);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearchClick(fieldValue, checkboxStatus);
  }

  useEffect(() => {
    if (typeof lastSearch.checkboxStatus === 'boolean')
    setCheckboxStatus(lastSearch.checkboxStatus)
    setFieldValue(lastSearch.keyWord || '')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSearch])

  // function checkStorage() {
  //   if (isSavedMovies && localStorage.getItem('lastSearchSaved')) setFieldValue(JSON.parse(localStorage.getItem('lastSearchSaved')).keyWord || '')
  //   if (!isSavedMovies && localStorage.getItem('lastSearch')) setFieldValue(JSON.parse(localStorage.getItem('lastSearch')).keyWord || '')
  //   // else setFieldValue(JSON.parse(localStorage.getItem('lastSearch')).keyWord || '')
  // }


  return (
    <section className="search">
      <form className="search__form" name="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите ключевое слово"
          className="search__field"
          onChange={handleChangeInput}
          required={isSavedMovies ? false : true}
          value={fieldValue}
        />
        <button type="submit" className="search__button opacity" >Найти</button>
        <FilterCheckbox currentStatus={checkboxStatus} onChange={handleChangeCheckbox} />
      </form>
    </section>
  )
}