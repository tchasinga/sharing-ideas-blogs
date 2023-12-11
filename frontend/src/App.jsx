import Hearder from './Components/Hearder'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
     <Hearder />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/singin" element={<SignIn />} />
    </Routes> 
    </BrowserRouter>
    </>
  )
}

export default App
