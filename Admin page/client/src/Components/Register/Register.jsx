import React, { useState } from 'react';
import './Register.css'
import findmateLogo from '../Login/findmateLogo.png'

import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/Bs'
import Axios from 'axios'

const Register = () =>{
    const [password, setPassword] = useState('')
    const [confirmpass, setConfirmpass] = useState('')
    const [username, setUsername] = useState('')

    const createUser = () => {
      if (!username || !password) {
        alert('Please fill in both fields.');
        return;
      }
      if (password !== confirmpass) {
        alert('Passwords do not match');
        return;
      }
    
      
    
      Axios.post('http://localhost:3003/register', {
        username: username,
        password: password,
      }).then(() => {
        console.log('User has been created');
        alert('Successfully registered!');
        window.location.href = '/login';
      })
    }
    return(
      
        <div className='loginPage flex'>
        <div className="container flex">
        
        <div className="formDiv flex">
            <div className="headerDiv">
                <img src={findmateLogo} alt="Logo img" />
                <h3>Register here!</h3>
                    
            
                </div>  

                <form action="" className='form grid'>
               
                    
                        <div className='inputDiv'>
                        <label htmlFor="username">Username</label>
                        <div className="input flex">
                            <FaUserShield className='icon'/>
                            <input type='text' id='username' placeholder='Enter username' onChange={(event)=>{setUsername(event.target.value)}}/>
                        </div>
                        </div>

                        <div className='inputDiv'>
                        <label htmlFor="password">Password</label>
                        <div className="input flex">
                            <BsFillShieldLockFill className='icon'/>
                            <input type='password' id='password' placeholder='Enter Password' onChange={(event)=>{setPassword(event.target.value)}}/>
                        </div>
                        <div className="input flex">
                            <BsFillShieldLockFill className='icon'/>
                            <input type='password' id='confirmpass' placeholder='Confirm Password' onChange={(event)=>{setConfirmpass(event.target.value)}}/>
                        </div>
                        </div>
                    
              
                    
                    </form>    
                    <button type='submit' className='btn flex' onClick={createUser}>
                        <span>Register </span>
                        
                    </button>
        </div>
        </div>
        </div>
    )
}
export default Register
