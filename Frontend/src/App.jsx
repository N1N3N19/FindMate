import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Signup1 from './Signup1'
import Signin from './Signin'
import Registration from './Registration'

function App() {

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage": "url('../src/assats/bg.jpg')"}}>
      <Routes>
        <Route path='Signin' element={<Signin/>}></Route> 
        <Route path='Signup' element={<Signup/>}></Route> 
        <Route path='Signup1' element={<Signup1/>}></Route>
        <Route path='Registration' element={<Registration/>}></Route>
      </Routes>
    </div>
  )
}

export default App
