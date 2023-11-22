import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import findmateLogo from './findmateLogo.png';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/Bs';
import Axios from 'axios';
const Login = () => {
    const [loginusername, setloginusername] = useState('');
    const [loginpassword, setloginpassword] = useState('');

    const loginUser = (event) => {
        event.preventDefault();
      
        if (!loginusername || !loginpassword) {
          alert('Please fill in both fields.');
          return;
        }
      
        Axios.post('http://localhost:3003/login', {
            loginusername: loginusername,
            loginpassword: loginpassword,
          }).then((response) => {
            if (response.data.message === "Login Successful") {
              console.log('Login successful!');
              // Redirect to the dashboard page
              window.location.href = '/dashboard';
            } else {
              console.log(response.data.message);
              alert(response.data.message);
            }
          })
      }


    return (
        <div className='loginPage flex'>
            <div className="container flex">
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={findmateLogo} alt="Logo img" />
                        <h3>Welcome Back!</h3>
                       
                    </div>
                    <form className='form grid'>
                   
                        <div className='inputDiv'>
                            <label htmlFor="text">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input
                                    type='text'
                                    id='username'
                                    placeholder='Enter username'
                                    value={loginusername}
                                    onChange={(e) => setloginusername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='inputDiv'>
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input
                                    type='password'
                                    id='password'
                                    placeholder='Enter Password'
                                    value={loginpassword}
                                    onChange={(e) => setloginpassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                    <button type='submit' className='btn flex' onClick={loginUser}>
                            <span>Login </span>
                        </button>
                        <span className='forgotPassword'>
                            Don't have an account? <Link to='/register'>Click here</Link>
                        </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
