import { Route, Routes } from 'react-router-dom'
import UserSignup from './UserSignup'
import UserSignin from './UserSignin'
import UserRegister from './UserRegister'
import UserAgreement from './UserAgreement'
import UserMode from './UserMode'
import UserFinishPF from './UserFinishPF'
import ChatContainer from './Chat/ChatContainer'
import Home from './Home'

function App() {

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage": "url('../src/assets/bg.jpg')"}}>
      <Routes>
    
        <Route path='/' element={<UserSignin/>}></Route>
        <Route path='Signin' element={<UserSignin/>}></Route> 
        <Route path='Signup' element={<UserSignup/>}></Route> 
        <Route path='Register' element={<UserRegister/>}></Route>
        <Route path='Agreement' element={<UserAgreement/>}></Route>
        <Route path='Home' element={<Home/>}></Route>
        <Route path='Chat' element={<ChatContainer/>}></Route>
        <Route path='Mode' element={<UserMode/>}></Route>
        <Route path='FinishPF' element={<UserFinishPF/>}></Route>
        </Routes>
    </div>
  )
}

export default App
