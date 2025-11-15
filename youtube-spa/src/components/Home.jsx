import { useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { persistor } from '../app/store'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOut = async () => {
    dispatch(logout())
    await persistor.flush()
    localStorage.clear()
    navigate('/registerform')
  }
  return (
    <>
      <h2>Поиск</h2>
      <button
        onClick={() => {
          logOut()
        }}
      >
        Logout
      </button>
    </>
  )
}

export default Home
