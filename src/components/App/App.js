import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

import MainApi from '../../utils/MainApi';
import { mainApiConfig } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

import Main from '../Main/Main.js';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Navigation from '../Navigation/Navigation';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoPopup from '../InfoPopup/InfoPopup';

function App() {
  const navigate = useNavigate();
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isRegistred, setIsRegistred] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ***************************************
  const user = {
    name: 'Виталий',
    email: 'pochtaa@yandex.ru',
    password: 'password',
  }
  // ***************************************
  
  function handleBurgerClick() {
    setIsBurgerOpened(true);
  }

  function closeBurgerMenu() {
    setIsBurgerOpened(false);
  }

  function openInfoPopup() {
    setIsInfoPopupOpen(true);
  }

  function closePopupInfo() {
    setIsInfoPopupOpen(false);
    isRegistred && navigate('/signin', {replace: true});
  }

  const mainApi = new MainApi(mainApiConfig)


  function handleRegister(userData) {
    mainApi.register(userData)
      .then(() => { 
        setIsRegistred(true)
        openInfoPopup()
       })
      .catch((err) => {
        setIsRegistred(false);
        setErrMessage(err.message)
      })
  }

  function handleLogin(userData) {
    mainApi.login(userData)
      .then((res) => {
        localStorage.setItem('jwt', res.jwt)
        setIsLoggedIn(true);
      })
      .then(() => navigate('/profile'))
      .catch((err) => {setErrMessage(err.message)})
  }

  function tokenCheck() {
    const token = localStorage.getItem('jwt');
    return !!token;
  }

  useEffect(() => {
    if (tokenCheck()) {
      mainApi.getUserData()
        .then(res => setCurrentUser(res))
        .catch((err) => {
          setErrMessage(err.message);
          isInfoPopupOpen(true);
        })
    }
  }, [isLoggedIn])
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Header isLoggedIn={false}/>
            <Main />
            <Footer />
          </>
        }/>
        <Route path="/movies" element={
          <>
            <Header
              isLoggedIn={true}
              onBurgerClick={handleBurgerClick}
            />
            <Movies />
            <Navigation
              isOpened={isBurgerOpened}
              onCloseClick={closeBurgerMenu}
            />
            <Footer />
          </>
        }/>
        <Route path="/saved-movies" element={
          <>
            <Header
              isLoggedIn={true}
              onBurgerClick={handleBurgerClick}
            />
            <Navigation
              isOpened={isBurgerOpened}
              onCloseClick={closeBurgerMenu}
            />
            <SavedMovies />
            <Footer />
          </>
        }/>
        <Route path="/profile" element={
          <>
            <Header
              isLoggedIn={true}
              onBurgerClick={handleBurgerClick}
            />
            <Navigation
              isOpened={isBurgerOpened}
              onCloseClick={closeBurgerMenu}
            />
            <Profile />
          </>
        }/>
        <Route path="/signup" element={
          <Register onSubmit={handleRegister} errMessage={errMessage}/>
        }/>
        <Route path="/signin" element={
          <Login errMessage={errMessage} onSubmit={handleLogin}/>
        }/>
        <Route path="*" element={<NotFound />}/>
        
      </Routes>
      <InfoPopup 
        isRegistred={isRegistred}
        isOpen={isInfoPopupOpen}
        onClose={closePopupInfo}
        errMessage={errMessage}
      />
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
