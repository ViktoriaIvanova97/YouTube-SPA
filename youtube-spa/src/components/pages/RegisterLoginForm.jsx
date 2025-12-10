import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser, loginUser} from '../../api/youtubeApi'
import {
  selectorError,
  selectorLoading,
} from '../../RTK/selectors/selectors'

const RegisterForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector(selectorLoading)
  const error = useSelector(selectorError)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [changeForm, setChangeForm] = useState(false)

  const handleRegister = async () => {
    try {
      const result = await dispatch(
        registerUser({ username, email, password, gender, age })
      )
      if (registerUser.fulfilled.match(result)) {
        alert('Регистрация успешна!')
        navigate('/home/search')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const handleLogin = async () => {
    try {
      const result = await dispatch(loginUser({ email, password }))
      if (loginUser.fulfilled.match(result)) {
        alert('Вход успешен')
        navigate('/home/search')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return changeForm ? (
    <form className="registerForm" autoComplete="off">
      <h2>Регистрация</h2>
      <input
        className="inputRegister"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Имя"
        autoComplete="off"
      />
      <input
        className="inputRegister"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="off"
      />
      <input
        className="inputRegister"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        autoComplete="new-password"
      />
      <select
        className="inputRegister"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Выберите пол</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </select>
      <input
        className="inputRegister"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Возраст"
        autoComplete="off"
      />
      <button type="button" onClick={handleRegister} disabled={loading}>
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      <div style={{ display: 'flex', alignItems: ' center', gap: ' 15px' }}>
        <h3>Уже есть аккаунт? </h3>
        <button type="button" onClick={() => setChangeForm(false)}>
          Log In!
        </button>
      </div>
    </form>
  ) : (
    <form className="registerForm" autoComplete="off">
      <h2>Авторизация</h2>
      <input
        className="inputRegister"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="off"
      />
      <input
        className="inputRegister"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        autoComplete="new-password"
      />
      <button type="button" onClick={handleLogin} disabled={loading}>
        {loading ? 'Вход...' : 'Войти'}
      </button>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      <div style={{ display: 'flex', alignItems: ' center', gap: ' 15px' }}>
        <h3>Еще нет аккаунта?</h3>
        <button type="button" onClick={() => setChangeForm(true)}>
          Sing Up!
        </button>
      </div>
    </form>
  )
}

export default RegisterForm
