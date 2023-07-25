import './SearchForm.css';
import '../Opacity/Opacity.css'

import { useState, useEffect } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({ onSearchClick, lastSearch }) {
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
  }, [lastSearch])

  return (
    <section className="search">
      <form className="search__form" name="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={lastSearch.keyWord || "Фильм"}
          className="search__field"
          onChange={handleChangeInput}
          required
        />
        <button type="submit" className="search__button opacity" >Найти</button>
        <FilterCheckbox currentStatus={checkboxStatus} onChange={handleChangeCheckbox} />
      </form>
    </section>
  )
}