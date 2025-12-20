import React from 'react'
import Menu from './components/Menu'

import { Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage'
import Offers from './components/Offers'
import Likes from './components/Likes'
import Notifications from './components/Notifications'
import Profile from './components/Profile'



const App = () => {
  return (
    <div>
      
      {/* <Menu/> */}
      {/* <Demo/> */}

      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/menu' element={<Menu/>} />
        <Route path='/Offers' element={<Offers/>} />
        <Route path='/likes' element={<Likes/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/notify' element={<Notifications/>} />

      </Routes>

    </div>

  )
}

export default App
