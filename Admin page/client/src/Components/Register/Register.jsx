import React from 'react'
import './Register.css'
import {Link, Link} from 'react-router-dom'

import findmateLogo from '../Login/findmateLogo.png'

import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/Bs'

const Register = () =>{
    return(
        <div className='loginPage flex'>
        <div className="container flex">
        
        <div className="formDiv flex">
            <div className="headerDiv">
                <img src={findmateLogo} alt="Logo img" />
                <h3>Let us know you!</h3>
                </div>  

                <form action="" className='form grid'>
                    <span>Register here</span>
                        
                    <div className='inputDiv'>
                        <label htmlFor="username">Username</label>
                        <div className="input flex">
                            <FaUserShield className='icon'/>
                            <input type='text' id='username' placeholder='Enter username'/>
                        </div>
                        </div>

                        <div className='inputDiv'>
                        <label htmlFor="password">Password</label>
                        <div className="input flex">
                            <BsFillShieldLockFill className='icon'/>
                            <input type='password' id='password' placeholder='Enter Password'/>
                        </div>
                        </div>
                    <button type='submit' className='btn flex'>
                        <span>Register </span>
                        
                    </button>
              
                    
                    </form>    
        </div>
        </div>
        </div>
    )
}
export default Register
