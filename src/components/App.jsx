import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import SendContext from "../contexts/SendContext.js";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { getUserData } from "../utils/auth.js";
import { authorization } from "../utils/auth.js";
import { auth } from "../utils/auth.js";

function App() {
  const navigate = useNavigate();
  // стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImageCardChoose, setIsImageCardChoose] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);

  // стейты контекста
  const [currentUser, setCurrentUser] = useState({}); //пустой объект
  const [dataUser, setDataUser] = useState("");

  // стейты карточки
  const [userCards, setUserCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState("");

  //стейты регистрации и логина
  // const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  // const [isSuccessful, setIsSuccessful] = useState(false);

  const [popupState, setPopupState] = useState("close"); // "close" | "success" | "failure"

  const [isError, setIsError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  //переменная состояния попапов
  const open =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isDeletePlacePopupOpen ||
    isImageCardChoose ||
    // isSuccessful ||
    isError;

  const setCloseAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageCardChoose(false);
    setSelectedCard(null);
    setIsDeletePlacePopupOpen(false);
    // setIsSuccessful(false);
    setPopupState("close");
    setIsError(false);
    // setInfoToolTipPopupOpen(false);
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then(
      (newCard) => {
        setUserCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      },
      (error) => {
        console.log(`Ошибка: ${error}`);
      }
    );
  }

  // function setEventListenerForEsc() {
  //   document.addEventListener('keydown', closePopupByEsc)
  // }

  // const closePopupByEsc = useCallback((event) => { // для закрытия по Esc
  //   if (event.key === "Escape") {
  //     setCloseAllPopups()
  //     document.removeEventListener('keydown', closePopupByEsc)
  //   }
  // }, [setCloseAllPopups])

  useEffect(() => {
    //ready
    const closePopupByEsc = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closePopupByEsc);
    return () => document.removeEventListener("keydown", closePopupByEsc);
  }, [open]);

  const closePopupByOverlay = useCallback(
    //ready
    (event) => {
      // для закрытия по Overlay
      if (event.target === event.currentTarget) {
        setCloseAllPopups();
      }
    },
    [open]
  );

  const closeAllPopups = useCallback(() => {
    //ready
    // для закрытия по Esc, Overlay и крестику
    setCloseAllPopups();
  }, [setCloseAllPopups, closePopupByOverlay]); //, closePopupByEsc

  useEffect(() => {
    //ready
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then((res) => {
          setDataUser(res.data.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }, [navigate]);

  function handleEditAvatarClick() {
    //для попапа аватара
    setIsEditAvatarPopupOpen(true);
    //setEventListenerForEsc()
  }

  function handleEditProfileClick() {
    //для попапа с редактированием профиля
    setIsEditProfilePopupOpen(true);
    //setEventListenerForEsc()
  }

  function handleAddPlaceClick() {
    // для попапа с добавлением новой карточки
    setIsAddPlacePopupOpen(true);
    //setEventListenerForEsc()
  }

  function handleDeletePlaceClick(cardId) {
    //для попапа с удалением карточки
    setIsDeletePlacePopupOpen(true);
    //setEventListenerForEsc()
    setDeleteCardId(cardId);
  }

  function handleImageCard(card) {
    //для попапа с картинкой карточки
    setSelectedCard(card);
    setIsImageCardChoose(card);
    //setEventListenerForEsc()
  }

  //запросы на сервер
  useEffect(() => {
    //ready
    if (loggedIn) {
      Promise.all([api.getInfo(), api.getCards()])
        .then(([dataUser, dataCards]) => {
          setCurrentUser(dataUser);
          setUserCards(dataCards);
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    }
  }, [loggedIn]);

  function handleDeletePlaceSubmit(event) {
    //onSubmit
    event.preventDefault();
    api
      .deleteCard(deleteCardId)
      .then(() => {
        setUserCards(
          userCards.filter((userCards) => {
            return userCards._id !== deleteCardId; //карточку оставляем если не равны
          })
        );
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleUpdateAvatar(dataUser, reset) {
    api
      .setUserAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleAddPlaceSubmit(dataCards, reset) {
    api
      .addCard(dataCards)
      .then((res) => {
        setUserCards([res, ...userCards]);
        closeAllPopups();
        reset();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleLogin(password, email) {
    setIsSend(true);
    authorization(password, email)
      .then((res) => {
        setIsSend(false);
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        setIsSend(false);
        setIsError(true);
        console.log(`Ошибкак при авторизации: ${error}`);
      });
  }

  console.log("handleLogin", handleLogin);

  function handleRegister(password, email) {
    setIsSend(true);
    auth(password, email)
      .then((res) => {
        setIsSend(false);
        setPopupState("success");
        // setIsSuccessful(true);
        // setInfoToolTipPopupOpen(true);
        navigate("/sign-in"); //авторизации пользователя.
      })
      .catch((error) => {
        setIsSend(false);
        setPopupState("failure");
        // setIsError(true);
        // setIsSuccessful(false);
        // setInfoToolTipPopupOpen(true);
        console.log(`Ошибкак при регистрации: ${error}`);
      });
  }

  // function handleLogout (){
  //   localStorage.removeItem('jwt');
  //   setDataUser('');
  //   setLoggedIn(false);
  // } loggedOut={handleLogout}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header dataUser={dataUser} loggedIn={loggedIn} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onTrashButton={handleDeletePlaceClick}
                onImageCard={handleImageCard}
                cards={userCards}
                onCardLike={handleCardLike}
                loggedIn={loggedIn}
                dataUser={dataUser} //почта
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header name="signup" />
                <Main name="signup" handleRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header name="signin" />
                <Main name="signin" handleLogin={handleLogin} />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />

        <SendContext.Provider value={isSend}>
          <EditAvatarPopup
            open={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup //popup for data profile editing
            open={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            open={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm //popup for a place card deleting
            name="popup_type_delete"
            title="Вы уверены?"
            formButton="Да"
            open={isDeletePlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeletePlaceSubmit}
          />

          <ImagePopup //popup for a full size image by click
            name="popup_type_image"
            open={selectedCard}
            card={isImageCardChoose}
            onClose={closeAllPopups}
          />
        </SendContext.Provider>

        {popupState === "success" && (
          <InfoTooltip open={true} onClose={closeAllPopups} isSuccess={true} />
        )}

        {popupState === "failure" && (
          <InfoTooltip open={true} onClose={closeAllPopups} isSuccess={false} />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
