import { useState } from 'react'
import './App.css'
import { Navbar } from './Components/Navbar'
import { Manager } from './Components/Manager'
import { Footer } from './Components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">

      <Manager/>
      </div>
      <Footer/>
    </>
  )
}

export default App
