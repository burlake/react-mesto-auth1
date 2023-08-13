import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

function AddPlacePopup ({ open, onClose, onAddPlace }) {
    const {values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()



    function resetForPopup() {
        onClose()
        reset()
    }

    function handleSubmit (event) {
        event.preventDefault()
        onAddPlace({name: values.name, link: values.link}, reset)
    }

    return (
        <PopupWithForm                               //popup for a new place card adding
          name="popup_type_new-card"
          title="Новое место"
          formButton="Создать"
          open={open}
          onClose={resetForPopup}
          isValid={isValid}
          onSubmit={handleSubmit}
        >
          <input
            required=""
            id="input-title"
            className={`form__subtitle form__subtitle_card_title ${isInputValid.name === undefined || isInputValid.name ? '' : 'form__subtitle__invalid'}`}
            type="text"
            name="name"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            onChange={handleChange}
            value={values.name ? values.name : ''}
          />
          <span id="input-title-error" className="error-message">{errors.name}</span>
          <input
            required=""
            id="input-link"
            className={`form__subtitle form__subtitle_card_image ${isInputValid.link === undefined || isInputValid.link ? '' : 'form__subtitle__invalid'}`}
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            onChange={handleChange}
            value={values.link ? values.link : ''}
          />
          <span id="input-link-error" className="error-message">{errors.link}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup