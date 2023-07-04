import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className="search">
      <form className="search__form" name="search-form">
        <input type="search" required placeholder="Фильм" className="search__field"/>
        <button type="submit" className="search__button">Найти</button>
        <FilterCheckbox />
      </form>
    </section>
  )
}