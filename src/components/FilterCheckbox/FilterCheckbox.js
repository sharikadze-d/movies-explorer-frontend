import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <label htmlFor="checkbox" className="filter-checkbox__label">
        Короткометражки
        <input className="filter-checkbox__input" type="checkbox" id="checkbox" />
        <div className="filter-checkbox__fake-checkbox"></div>
      </label>
    </div>
  )
}