import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Todo from './components/Todo'
import Home from './components/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/todos' element= {<Todo/>}/>
      </Routes>
    </>
  )
}

export default App
