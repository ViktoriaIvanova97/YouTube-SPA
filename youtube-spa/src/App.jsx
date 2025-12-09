import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import RegisterForm from './components/RegisterLoginForm'
import Home from './components/Home'
import SearchPage from './components/SearchPage'
const FavoritesPage = lazy(() => import('./components/FavoritesPage'))
import './App.css'

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/home/*" element={<Home />}>
          <Route index element={<Navigate to="search" />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
