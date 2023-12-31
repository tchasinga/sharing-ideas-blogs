import Hearder from './Components/Hearder'
import About from './Pages/About'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './Pages/SignUp'
import PrivateRoom from './Components/PrivateRoom'
import Profile from './Pages/Profile'
import Updateprofile from './Pages/Updateprofile'
import Createsharingideas from './Pages/Createsharingideas'
import Sharingdeteals from './Pages/Sharingdeteals'
import UpdateSharing from './Pages/UpdateSharing'
import NoFound from './Pages/NoFound'
import Search from './Pages/Search'

function App() {

  return (
    <>
    <BrowserRouter>
     <Hearder />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/about" element={<About />} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path="/sharingdeteals/:sharingId" element={<Sharingdeteals />} />
      <Route path='/search' element={<Search />}/>
      <Route path="*" element={<NoFound/>} />

      <Route element={<PrivateRoom/>}>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/editprofile" element={<Updateprofile/>} />
        <Route path="/createSharing" element={<Createsharingideas />} />
        <Route path="/updating-sharing/:sharingId" element={<UpdateSharing />} />
      </Route>
    </Routes> 
    </BrowserRouter>
    </>
  )
}

export default App
