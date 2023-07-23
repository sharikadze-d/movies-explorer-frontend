import './SearchForm.css';
import '../Opacity/Opacity.css'

import { useState } from 'react';

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

  return (
    <section className="search">
      <form className="search__form" name="search-form">
        <input type="text" required placeholder={lastSearch.keyWord || "Фильм"} className="search__field" onChange={handleChangeInput}/>
        <button type="submit" className="search__button opacity" onClick={handleSubmit} >Найти</button>
        <FilterCheckbox currentStatus={checkboxStatus} onChange={handleChangeCheckbox} />
      </form>
    </section>
  )
}