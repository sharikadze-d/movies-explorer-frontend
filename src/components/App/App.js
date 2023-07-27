import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

import MainApi from '../../utils/MainApi';
import { mainApiConfig, moviesApiConfig } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

import Main from '../Main/Main.js';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoPopup from '../InfoPopup/InfoPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Preloader from '../Preloader/Preloader';
import MoviesApi from '../../utils/MoviesApi';

function App() {
  const navigate = useNavigate();
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isRegistred, setIsRegistred] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [istokenChecked, setIsTokenChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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
  }

  const mainApi = new MainApi(mainApiConfig);
  const moviesApi = new MoviesApi(moviesApiConfig);

  function handleRegister(userData) {
    mainApi.register(userData)
      .then(() => { 
        setIsRegistred(true);
        openInfoPopup();
        handleLogin(userData);
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
        mainApi.getUserData(res.jwt)
          .then((res) => {
            setIsLoggedIn(true);
            setCurrentUser(res);
            navigate('/movies');
            setErrMessage('');
          })
      })
      .catch((err) => {setErrMessage(err.message)})
  }

  async function tokenCheck() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setIsTokenChecked(true);
      return;
    }
    mainApi.getUserData()
      .then(res => { 
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
        }
       })
       .catch(err => setErrMessage(err.message))
       .finally(() => setIsTokenChecked(true))
  }

  function handleUpdateProfile (userData) {
    mainApi.updateUserData(userData)
      .then(() => window.location.reload())
      .catch((err) => {setErrMessage(err.message)})
  }

  function handleLogOut () {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }

  useEffect(() => {
    setIsLoading(true);
    tokenCheck()
      .then(() => setIsLoading(false))
      .catch((err) => {
        setIsLoading(false);
        setErrMessage(err.message);
        openInfoPopup();
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`app ${isLoading ? 'app_preloader' : ''}`}>
      <Routes>
        <Route path="/" element={
          <>
            <Header
              isLoggedIn={isLoggedIn}
              isMainPage={true}
              onBurgerClick={handleBurgerClick}
            />
            <Navigation
              element={Navigation}
              isLoggedIn={isLoggedIn}
              isOpened={isBurgerOpened}
              onCloseClick={closeBurgerMenu}
              main={true}
            />
            <Main />
            <Footer />
          </>
        }/>
        <Route path="/movies" element={
          istokenChecked ?
          <>
            <ProtectedRoute 
              element={Header}
              isAuthPage={false}
              isLoggedIn={isLoggedIn}
              onBurgerClick={handleBurgerClick}
            />
            <ProtectedRoute 
              element={Navigation}
              isAuthPage={false}
              isLoggedIn={isLoggedIn}
              isOpened={isBurgerOpened}
              onCloseClick={closeBurgerMenu}
              movies={true}
            />
            <ProtectedRoute 
              element={Movies}
              isAuthPage={false}
              isLoggedIn={isLoggedIn}
              moviesApi={moviesApi}
              mainApi={mainApi}
              isSavedMovies={false}
            />
            <ProtectedRoute 
              element={Footer}
              isAuthPage={false}
              isLoggedIn={isLoggedIn}
            />
          </> :
          <Preloader isLoading={isLoading} />
        }/>
        <Route path="/saved-movies" element={
          istokenChecked ?
          <>
            <ProtectedRoute 
              element={Header}
              isAuthPage={false}
              isLoggedIn={isLoggedIn}
              onBurgerClick={handleBurgerClick}
            />
            <ProtectedRoute 
              element={Navigation}
              isAuthPage={false}
              isLoggedIn={isLoggedIn}
              isOpened={isBurgerOpened}
              onCloseClick={closeBurgerMenu}
              savedMovies={true}
            />
            <ProtectedRoute 
              element={Movies}
              isAuthPage={false}
              isLoggedIn={isLoggedIn}
              moviesApi={moviesApi}
              mainApi={mainApi}
              isSavedMovies={true}

            />
            <ProtectedRoute 
              element={Footer}
              isAuthPage={false}
              isLoggedIn={isLoggedIn}
            />
          </> :
          <Preloader isLoading={isLoading} /> 
        }/>

        <Route path="/profile" element={
          istokenChecked ?
          <>
            <ProtectedRoute 
              element={Header}
              isAuthPage={false}
              isLoggedIn={isLoggedIn}
              onBurgerClick={handleBurgerClick}
            />
            <ProtectedRoute 
              element={Navigation}
              isAuthPage={false}
              isLoggedIn={isLoggedIn}
              isOpened={isBurgerOpened}
              onCloseClick={closeBurgerMenu}
              profile={true}
            />
            <ProtectedRoute 
              element={Profile}
              isAuthPage={false}
              isLoggedIn={isLoggedIn}
              onSubmit={handleUpdateProfile}
              errMessage={errMessage}
              onLogout={handleLogOut}
            />
          </> :
          <Preloader isLoading={isLoading} />        
        }/>

        <Route path="/signup" element={
          <ProtectedRoute 
            element={Register}
            isAuthPage={true}
            isLoggedIn={isLoggedIn}
            onSubmit={handleRegister}
            errMessage={errMessage}
          />
        }/>

        <Route path="/signin" element={
          <ProtectedRoute 
            element={Login}
            isAuthPage={true}
            isLoggedIn={isLoggedIn}
            onSubmit={handleLogin}
            errMessage={errMessage}
          />
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
