import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ManagerForm from './components/ManagerForm'
import AddNewManager from './components/AddNewManager'


function App() {
  return (
    <>
     <BrowserRouter>
     <h1 >PROJECT MANAGER</h1>
      <Routes>
        <Route path='/' element={<AddNewManager/>}/>
        <Route path='/projects/new' element={<ManagerForm/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App