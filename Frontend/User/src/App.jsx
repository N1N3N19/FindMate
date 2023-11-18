import { Route, Routes } from 'react-router-dom'
import UserSignup from './UserSignup'
import UserSignin from './UserSignin'
import UserRegister from './UserRegister'
import UserAgreement from './UserAgreement'
import UserMode from './UserMode'
import UserFinishPF from './UserFinishPF'
import ChatContainer from './Chat/ChatContainer'
import Home from './Home'
import TerminateMate from './TerminateMate'
import Dashboard from './Dashboard'

function App() {

  return (
    <div>
      <Routes>
    
        <Route path='/' element={<UserSignin/>}></Route>
        <Route path='Signin' element={<UserSignin/>}></Route> 
        <Route path='Signup' element={<UserSignup/>}></Route> 
        <Route path='Register' element={<UserRegister/>}></Route>
        <Route path='Agreement' element={<UserAgreement/>}></Route>
        <Route path='Home' element={<Home/>}></Route>
        <Route path='Chat' element={<ChatContainer/>}></Route>
        <Route path='TerminateMate' element={<TerminateMate/>}></Route>
        <Route path='Mode' element={<UserMode/>}></Route>
        <Route path='FinishPF' element={<UserFinishPF/>}></Route>
        <Route path='Dashboard' element={<Dashboard/>}></Route>
        </Routes>
    </div>
  )
}

export default App
