import { Route, Routes } from 'react-router-dom'
import UserSignup from './UserSignup'
import UserSignin from './UserSignin'
import UserRegister from './UserRegister'
import UserAgreement from './UserAgreement'
import UserMode from './UserMode'

function App() {

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage": "url('../src/assets/bg.jpg')"}}>
      <Routes>
    
        <Route path='/' element={<UserSignin/>}></Route>
        <Route path='UserSignin' element={<UserSignin/>}></Route> 
        <Route path='UserSignup' element={<UserSignup/>}></Route> 
        <Route path='UserRegister' element={<UserRegister/>}></Route>
        <Route path='UserAgreement' element={<UserAgreement/>}></Route>
        <Route path='UserMode' element={<UserMode/>}></Route>
        </Routes>
    </div>
  )
}

export default App
