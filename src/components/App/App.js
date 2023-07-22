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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Preloader from '../Preloader/Preloader';

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
        console.log(localStorage.getItem('jwt'));
        // setIsLoggedIn(true);
        mainApi.getUserData(res.jwt)
          .then((res) => {
            setIsLoggedIn(true);
            navigate('/movies');
          })
      })
      // .then(() => navigate('/movies'))
      .catch((err) => {setErrMessage(err.message)})
  }

  async function tokenCheck() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return;
    }
    mainApi.getUserData()
      .then(res => { 
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
          setIsTokenChecked(true);
          navigate('/movies');
        }
       })
       .catch(err => setErrMessage(err.message))
  }

  function handleUpdateProfile (userData) {
    mainApi.updateUserData(userData)
      .then(() => window.location.reload())
      .catch((err) => {setErrMessage(err.message)})
  }

  function handleLogOut () {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
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
            <Header isLoggedIn={false}/>
            <Main />
            <Footer />
          </>
        }/>
        <Route path="/movies" element={
          <>
            <Header
              isLoggedIn={isLoggedIn}
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
          istokenChecked ?
          <>
            <ProtectedRoute 
              element={Header}
              isLoggedIn={isLoggedIn}
              onBurgerClick={handleBurgerClick}
            />
            <ProtectedRoute 
              element={Navigation}
              isLoggedIn={isLoggedIn}
              isOpened={isBurgerOpened}
              onCloseClick={closeBurgerMenu}
            />
            <ProtectedRoute 
              element={Profile}
              isLoggedIn={isLoggedIn}
              onSubmit={handleUpdateProfile}
              errMessage={errMessage}
              onLogout={handleLogOut}
            />
          </> :
          <Preloader isLoading={isLoading} />        
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
