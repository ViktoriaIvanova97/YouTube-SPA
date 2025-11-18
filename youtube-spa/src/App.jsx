import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterForm from './components/RegisterLoginForm'
import Home from './components/Home'
import SearchPage from './components/SearchPage'
import FavoritesPage from './components/FavoritesPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/registerform" element={<RegisterForm />} />
      <Route path="/home/*" element={<Home />}>
        <Route index element={<Navigate to="/search" />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  )
}

export default App
