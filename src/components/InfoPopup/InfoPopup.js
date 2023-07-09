import imageOK from '../../images/ok-icon.svg';
import imageError from '../../images/error-icon.svg';

import './InfoPopup.css'

export default function InfoTooltip({ isRegistred, isOpen, onClose, errMessage }) {
  return (
    <div className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-btn opacity" onClick={onClose}></button>
          <img className="popup__image"
            src={isRegistred ? imageOK : imageError} 
            alt={isRegistred ? 'Успешная регистрация' : 'Ошибка'}
          />
          <h3 className="popup__title">
            {isRegistred ? 'Вы успешно зарегистрировались!' : (errMessage || 'Что-то пошло не так! Попробуйте ещё раз.')}
          </h3>
        </div>
      </div>
  );
}