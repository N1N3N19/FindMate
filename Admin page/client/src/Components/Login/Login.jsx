import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import findmateLogo from './findmateLogo.png';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/Bs';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!email || !password) {
            setLoginError('Please enter both email and password.');
            return;
        }

        // Simulate asynchronous login process (replace with actual API call)
        try {
            // Here you would make a request to your backend for authentication
            // For simplicity, we'll just simulate a successful login after a short delay
            // Replace the setTimeout block with your actual authentication logic
            setTimeout(() => {
                console.log('Login successful!');
                // Redirect to the dashboard or perform necessary actions after successful login
            }, 1000);
        } catch (error) {
            console.error('Login failed:', error.message);
            setLoginError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className='loginPage flex'>
            <div className="container flex">
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={findmateLogo} alt="Logo img" />
                        <h3>Welcome Back!</h3>
                    </div>
                    <form onSubmit={handleSubmit} className='form grid'>
                        <span>{loginError}</span>
                        <div className='inputDiv'>
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input
                                    type='email'
                                    id='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type='submit' className='btn flex'>
                            <span>Login </span>
                        </button>
                        <Link to='/sidebar'>Dashboard</Link>
                        <span className='forgotPassword'>
                            Forgot your password? <Link to='/forgot-password'>Click here</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
