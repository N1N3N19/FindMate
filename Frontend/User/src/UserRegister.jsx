import { useState } from 'react';
import { Link } from "react-router-dom";
import {BsPersonVcard} from "react-icons/bs";
import {BsGenderAmbiguous} from "react-icons/bs";
import logo from '../src/assets/logo.png';
import '../src/UserPlaceholder.css'
import '../src/UserCustom.css'

const UserRegister = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');

    const handleinfoInput = async (e) => {
        e.preventDefault();
        const dataTosend = { name, gender, dob};
        console.log('Data to send:', dataTosend);

        const response = await fetch('http://localhost:5001/api/user/regis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataTosend),
        });

        const data = await response.json();
        console.log('API Response:', data);

        if (response.ok) {
            // Handle success
            console.log(data.message);
        } else {
            // Handle error
            console.error('Insert failed:', data.message);
        }
    }
    
    return (
        <div>
            <div className="bg-white border border-amber-400 rounded-lg p-10 w-96 box-border shadow-lg backdrop-filter backdrop-blur-lg relative transition-all duration-200">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={logo} alt="Logo" style={{ width: '75px', height: 'auto' }} />
                </div>
                <h1 className="text-3xl text-gray-950 font-bold mt-5 mb-5 text-center">Register</h1>
                <form action="">
                <div className="relative my-4">
                    <input id="input" type="text" className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder="" onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="" for="input" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Display Name...</label>
                    <BsPersonVcard className="absolute top-4 right-4 text-neutral-500 duration-300 peer-focus:text-gray-950"/>
                </div>
                <div className="relative my-4">
                    <input type="text" id="input" className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder="" onChange={(e) => setGender(e.target.value)}/>
                    <label htmlFor="" for="input" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Gender...</label>
                    <BsGenderAmbiguous className="absolute top-4 right-4 text-neutral-500 duration-300 peer-focus:text-gray-950"/>
                </div>
                <div className="relative" style={{bottom: '10px'}}>
                    <label className="text-xs text-neutral-300 py-2.5 pl-3">Date of Birth</label>
                    <input type="date" className="rounded-full w-full py-2.5 pl-3 pr-4 px-0 mt-1 text-sm text-gray-400 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer custom-calender" placeholder="" onChange={(e) => setDob(e.target.value)}/>
                </div>
                <div>
                    <input type="checkbox" id="checkbox" className="relative my-1 mx-3.5 right-2 top-1.5"></input>
                    <label htmlfor="checkbox" className="flex items-start pl-2 left-2.5 absolute scale-75 w-full text-neutral-500" style={{top: '385.5px'}}>I agree to the  <Link to="/UserAgreement" target="_blank" className="ml-1 hover:text-orange-600"><u>Terms & Conditions and Privacy Policy.</u></Link></label>
                </div>
                <button className="w-full wtext-[18px] mt-6 rounded-full bg-orange-600 text-white hover:ring-1 ring-amber-400 hover:bg-white hover:text-orange-600 py-2 transition-colors duration-300" type="submit"><b>NEXT</b></button>
                </form>
            </div>
                <div className="relative my-2 text-center">
                    <span className="text-blue-gray-100">Wolfgang: Triple-N © 2023</span>
                </div>
        </div>
    );
};

export default UserRegister;