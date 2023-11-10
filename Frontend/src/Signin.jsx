import { Link } from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {AiOutlineUnlock} from "react-icons/ai";
import logo from '../src/assets/logo.png';

const Signin = () => {
    return (
        <div>
            <div className="bg-white border border-amber-400 rounded-lg p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-100 relative transition-all duration-200">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
                </div>
                <h1 className="text-3xl text-gray-950 font-bold mt-5 mb-5 text-left">Sign in</h1>
                <form action="">
                <div className="relative my-4">
                    <input type="text" className="rounded-full w-full py-2.5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder=""/>
                    <label htmlFor="" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-1 peer-focus:text-amber-400 peer-focus:dark:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email...</label>
                    <BiUser className="absolute top-4 right-4 text-neutral-500 duration-300 peer-focus:text-black"/>
                </div>
                <div className="relative my-4">
                    <input type="password" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:amber-400 peer" placeholder=""/>
                    <label htmlFor="" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-400 peer-focus:dark:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password...</label>
                    <AiOutlineUnlock className="absolute top-4 right-4 text-black"/>
                </div>
                <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-orange-600 text-white hover:border border-amber-400 hover:bg-white hover:text-orange-600 py-2 transition-colors duration-300" type="submit"><b>NEXT</b></button>
                <div className="text-center">
                    <Link className="text-neutral-500" to='/Signup'><u>Forgot your password?</u></Link>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;