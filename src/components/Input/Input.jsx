import { useContext } from 'react'
import SendContext from '../../contexts/SendContext'

export default function Input({ name, type, placeholder, minLength, maxLength, isInputValid, value, onChange, error }) {
  const isSend = useContext(SendContext)

  return (
    <>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        minLength={minLength ? minLength : ''}
        maxLength={maxLength ? maxLength : ''}
        required
        className={
          `${name === 'password' || name === 'email' ? 'login__input' : 'popup__input'}
          ${isInputValid === undefined || isInputValid ? '' : name === 'login' || name === 'email' ? 'login__input_invalid' : 'popup__input_invalid'}`
        }
        value={value ? value : ''}
        onChange={onChange}
        disabled={isSend}
      />
      <span className={
        `${name === 'password' || name === 'email' ? 'login__error' : 'error-message'}`}>{error}</span>
    </>
  )
}