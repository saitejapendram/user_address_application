
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Address } from './pages/Address'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

function App() {
  

  return (
    <>
      <BrowserRouter>
         <Routes>
          <Route path="/" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/address" element={<Address />}/>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
