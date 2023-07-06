import { useNavigate } from 'react-router-dom';

import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => { navigate(-1, { replace: true }) };

  return (
    <section className="not-found">
      <div className="not-found__content">
        <div>
          <h1 className="not-found__title">404</h1>
          <p className="not-found__subtitle">Страница не найдена</p>
        </div>
        <button className="not-found__goback" onClick={goBack}>Назад</button>
      </div>
    </section>
  )
}