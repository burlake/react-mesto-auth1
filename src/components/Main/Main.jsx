import Card from "../Card/Card.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Main({ cards, onEditProfile, onEditAvatar, onAddPlace, onTrashButton, onImageCard, onCardLike }) {

  const currentUser = useContext(CurrentUserContext)


  return (
    <main>
      <section className="profile">
        <img className="profile__photo" src={currentUser.avatar} alt="Аватар автора профайла."/>
        <button className="profile__pen-button" onClick={onEditAvatar} />
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}/>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}/>
      </section>

      <section>
        <div className="gallery">
          {cards.map((data) => {
            return (
              <Card
                key={data._id}
                card={data}
                onImageCard={onImageCard}
                onTrashButton={onTrashButton}
                onCardLike = {onCardLike}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
