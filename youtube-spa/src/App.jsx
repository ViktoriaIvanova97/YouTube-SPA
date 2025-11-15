import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from './components/RegisterLoginForm'
import Home from "./components/Home";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registerform" replace />} />
      <Route path="/registerform" element={<RegisterForm />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
