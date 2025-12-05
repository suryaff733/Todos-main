

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './component/login'
import Home from './component/Todo'
import Signup from './component/signup'


function App() {
  

  return (
    <>
    <div>
      <BrowserRouter>
      <Routes>
        <Route element={<Login />} path='/'/>
        <Route element={<Home />} path='/home'/>
        <Route element={<Signup/>} path='/signup'/>
      </Routes>
      </BrowserRouter>
      

    </div>
    </>
  )
}

export default App
