import React from 'react'
import Menu from './components/Menu'
import Demo from './components/Demo'
import { Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage'



const App = () => {
  return (
    <div>
      
      {/* <Menu/> */}
      {/* <Demo/> */}

      <Routes>
        <Route path='/home' element={<Homepage/>} />
        <Route path='/menu' element={<Menu/>} />
      </Routes>

    </div>

  )
}

export default App
