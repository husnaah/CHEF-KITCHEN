import React from 'react'
import Homepage from './components/homepage'
import Menu from './components/Menu'
import Demo from './components/Demo'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <div>
      {/* <Homepage/> */}
      {/* <Menu/> */}
      {/* <Demo/> */}

      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/home' element={<Menu/>} />
      </Routes>

    </div>

  )
}

export default App
