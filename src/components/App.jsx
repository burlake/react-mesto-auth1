import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx"
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() {
  // стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImageCardChoose, setIsImageCardChoose] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);

  // стейты контекста
  const [currentUser, setCurrentUser] = useState({}) //пустой объект

  // стейты карточки
  const [userCards, setUserCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState ('')

  const setCloseAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImageCardChoose(false)
    setSelectedCard(null)
    setIsDeletePlacePopupOpen(false)
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setUserCards((state) => state.map((c) =>
          c._id === card._id ? newCard : c))
      },
        (error) => {
          console.log(`Ошибка: ${error}`);
        })
  };

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
    const closePopupByEsc = (event) => {
        if (event.key === "Escape") {
            closeAllPopups();
        }
    };
    document.addEventListener("keydown", closePopupByEsc);
    return () => document.removeEventListener("keydown", closePopupByEsc);
  }, [
    isEditProfilePopupOpen, 
    isEditAvatarPopupOpen, 
    isAddPlacePopupOpen, 
    isImageCardChoose, 
    selectedCard, 
    isDeletePlacePopupOpen,
    isDeletePlacePopupOpen]);

  const closePopupByOverlay = useCallback((event) => { // для закрытия по Overlay
    if (event.target === event.currentTarget) {
      setCloseAllPopups()
    }
  }, [
    isEditProfilePopupOpen, 
    isEditAvatarPopupOpen, 
    isAddPlacePopupOpen, 
    isImageCardChoose, 
    selectedCard, 
    isDeletePlacePopupOpen,
    isDeletePlacePopupOpen
  ])

  const closeAllPopups = useCallback(() => {   // для закрытия по Esc, Overlay и крестику
    setCloseAllPopups()
  }, [setCloseAllPopups, closePopupByOverlay]) //, closePopupByEsc

  function handleEditAvatarClick() { //для попапа аватара
    setIsEditAvatarPopupOpen(true)
    //setEventListenerForEsc()
  }

  function handleEditProfileClick() { //для попапа с редактированием профиля
    setIsEditProfilePopupOpen(true)
    //setEventListenerForEsc()
  }

  function handleAddPlaceClick() { // для попапа с добавлением новой карточки
    setIsAddPlacePopupOpen(true)
    //setEventListenerForEsc()
  }

  function handleDeletePlaceClick(cardId) { //для попапа с удалением карточки
    setIsDeletePlacePopupOpen(true)
    //setEventListenerForEsc()
    setDeleteCardId(cardId)
  }

  function handleImageCard(card) { //для попапа с картинкой карточки
    setSelectedCard(card)
    setIsImageCardChoose(card) 
    //setEventListenerForEsc()
  }

  //запросы на сервер
  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser)
        setUserCards(dataCards);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }, []);

  function handleDeletePlaceSubmit(event) { //onSubmit
    event.preventDefault()
    api.deleteCard(deleteCardId)
    .then (() => {
      setUserCards (userCards.filter (userCards => {
        return userCards._id !== deleteCardId //карточку оставляем если не равны
      }))
      closeAllPopups()
    })
    .catch((error) => {console.log(`Ошибка: ${error}`)})
  }

  function handleUpdateUser (dataUser, reset) {
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => {console.log(`Ошибка: ${error}`)})
  }

  function handleUpdateAvatar(dataUser, reset) {
    api.setUserAvatar(dataUser)
      .then (res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => {console.log(`Ошибка: ${error}`)})
  }

  function handleAddPlaceSubmit(dataCards, reset) {
    api.addCard(dataCards)
      .then ((res) => {
        setUserCards([res, ...userCards])
        closeAllPopups()
        reset()
      })
      .catch((error) => {console.log(`Ошибка: ${error}`)})
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className="page__container">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onTrashButton={handleDeletePlaceClick}
          onImageCard={handleImageCard}
          cards={userCards}
          onCardLike={handleCardLike}
        />

        <Footer />

        <EditProfilePopup                            //popup for data profile editing
          open={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          open={isAddPlacePopupOpen }
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          open={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm                               //popup for a place card deleting
          name="popup_type_delete"
          title="Вы уверены?"
          formButton="Да"
          open={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeletePlaceSubmit}
        />

        <ImagePopup                                  //popup for a full size image by click
          name="popup_type_image"
          open={selectedCard}
          card={isImageCardChoose}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
