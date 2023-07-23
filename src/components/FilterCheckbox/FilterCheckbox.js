import './FilterCheckbox.css';
import '../Opacity/Opacity.css'

export default function FilterCheckbox({ currentStatus, onChange }) {
  return (
    <div className="filter-checkbox">
      <label htmlFor="checkbox" className="filter-checkbox__label opacity">
        Короткометражки
        <input className="filter-checkbox__input" type="checkbox" id="checkbox" checked={currentStatus} onChange={onChange} />
        <div className="filter-checkbox__fake-checkbox"></div>
      </label>
    </div>
  )
}