import { useState } from 'react';
import { Link } from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {AiOutlineUnlock} from "react-icons/ai";
import logo from '../src/assets/logo.png';



const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cfPassword, setCfPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = { email, password, cfPassword };
        console.log('Data to send:', dataToSend);
    
        const response = await fetch('http://localhost:5001/api/user/regis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
    
        const data = await response.json();
        console.log('API Response:', data);
    
        if (response.ok) {
            // Handle success
            console.log(data.message);
        } else {
            // Handle error
            console.error('Sign-up failed:', data.message);
        }
    };
    return (
        <div>
            <div className="bg-white border border-amber-400 rounded-lg p-10 w-96 box-border shadow-lg backdrop-filter backdrop-blur-lg relative transition-all duration-200">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
                </div>
                <h1 className="text-3xl text-gray-950 font-bold mt-5 mb-5 text-left">Sign up</h1>
                <form onSubmit={handleSubmit}>
                <div className="relative my-4">
                    <input type="email" className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Enter your email...</label>
                    
                    <BiUser className="absolute top-4 right-4 text-neutral-500 duration-300 peer-focus:text-gray-950"/>
                </div>
                <div className="relative my-4">
                    <input type="password" className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Enter your password...</label>
                    <AiOutlineUnlock className="absolute top-4 right-4 text-neutral-500 duration-300 peer-focus:text-gray-950"/>
                </div>
                <div className="relative mb-1">
                    <input type="password" className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder="Confirm Password" value={cfPassword} onChange={(e) => setCfPassword(e.target.value)}/>
                    <label htmlFor="" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Confirm your password...</label>
                    <AiOutlineUnlock className="absolute top-4 right-4 text-neutral-500 duration-300 peer-focus:text-gray-950"/>
                </div>
                <button className="w-full mb-4 wtext-[18px] mt-6 rounded-full bg-orange-600 text-white hover:ring-1 ring-amber-400 hover:bg-white hover:text-orange-600 py-2 transition-colors duration-300" type="submit"><b>NEXT</b></button>
                <div className="relative my-2 text-center">
                    <span className="text-neutral-500">Already have an account?  <Link className="text-neutral-500 hover:text-orange-600" to='/Signin'><u>Sign in</u></Link></span>
                </div>
                </form>0
                <div>
            {/* Your existing JSX for the sign-up form */}
            
            
            
        </div>
            </div>
        </div>
    );
};

export default Signup;