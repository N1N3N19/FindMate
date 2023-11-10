import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Signin from './Signin'
import Registration from './Registration'

function App() {

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage": "url('../src/assets/bg.jpg')"}}>
      <Routes>
        <Route path='Signin' element={<Signin/>}></Route> 
        <Route path='Signup' element={<Signup/>}></Route> 
        <Route path='Registration' element={<Registration/>}></Route>
      </Routes>
    </div>
  )
}

export default App
