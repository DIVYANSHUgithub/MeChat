import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
//In JSX, lowercase tags are treated as HTML elements, not React components. Uppercase tags refer to components
// It is compulsory to have the first letter of the component to be capital
import LogIn from './pages/login'
import SignUp from './pages/signUp'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />
      <Route path='/login' element={<LogIn/>} />
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
  )
}

export default App
