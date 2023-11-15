import React, { useState } from 'react';
import oui from '../src/assets/oui.jpg';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Modes = () => {
  const { userID } = useParams();

  const [displayFriendDesc, setDisplayFriendDesc] = useState(false);
  const [displayFanDesc, setDisplayFanDesc] = useState(false);
  const [displayFunDesc, setDisplayFunDesc] = useState(false);

  const handleMouseEnter = (mode) => {
    if (mode === 'friend') {
      setDisplayFriendDesc(true);
      setDisplayFanDesc(false);
      setDisplayFunDesc(false);
      console.log(mode);
    } else if (mode === 'fan') {
      setDisplayFanDesc(true);
      setDisplayFriendDesc(false);
      setDisplayFunDesc(false);
      console.log(mode);
    } else if (mode === 'fun') {
      setDisplayFunDesc(true);
      setDisplayFriendDesc(false);
      setDisplayFanDesc(false);
      console.log(mode);
    }
  };

  const handleMouseLeave = () => {
    setDisplayFriendDesc(false);
    setDisplayFanDesc(false);
    setDisplayFunDesc(false);
  };

  const navigate = useNavigate();
  const handleFormSubmit = async (mode) => {
        
        const dataTosend = {mode};
        
        const response = await fetch(`http://localhost:5001/api/user/regis/complete/${userID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataTosend),
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            // Handle success
            console.log(data.message);
            navigate(`/UserSignin`);
        } else {
            // Handle error   
            console.log('dd',dataTosend);
            console.error('Insert failed:', data.message);
        }
    };
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="relative">
        <div
          className="w-96 h-104 bg-white border border-amber-400 rounded-lg p-4 box-border shadow-lg backdrop-filter backdrop-blur-lg transition-all duration-200"
          onMouseEnter={() => handleMouseEnter('friend')}
          onMouseLeave={handleMouseLeave} 
          onClick={() => handleFormSubmit('friend')}
        >
          <img src={oui} alt="oui1" className="w-full h-full rounded-lg" />
          {displayFriendDesc && (
            <label
              htmlFor=""
              className="absolute rounded-lg w-full h-full bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-300 text-center bg-opacity-70 bg-gray-800 text-white text-sm font-sans cursor-pointer flex items-center justify-center"
            >
              Find your funkiest pals from FRIEND mode!
            </label>
          )}
        </div>
        <label className="absolute text-4xl pt-4 pl-12 left-20"><b>FRIEND</b></label>
      </div>
      <div className="relative">
        <div
          className="w-96 h-104 bg-white border border-amber-400 rounded-lg p-4 box-border shadow-lg backdrop-filter backdrop-blur-lg transition-all duration-300"
          onMouseEnter={() => handleMouseEnter('fan')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleFormSubmit('fan')}
          
        >
          <img src={oui} alt="oui2" className="w-full h-full rounded-lg" />
          {displayFanDesc && (
            <label
              htmlFor=""
              className="absolute rounded-lg w-full h-full bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-300 text-center bg-opacity-70 bg-gray-800 text-white text-sm font-sans cursor-pointer flex items-center justify-center"
            >
              Find your finest partner from FAN mode!
            </label>
          )}
        </div>
        <label className="absolute text-4xl pt-4 pl-20 left-20"><b>FAN</b></label>
      </div>
      <div className="relative">
        <div
          className="w-96 h-104 bg-white border border-amber-400 rounded-lg p-4 box-border shadow-lg backdrop-filter backdrop-blur-lg transition-all duration-200"
          onMouseEnter={() => handleMouseEnter('fun')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleFormSubmit('fun')}
        >
          <img src={oui} alt="oui3" className="w-full h-full rounded-lg" />
          {displayFunDesc && (
            <label
              htmlFor=""
              className="absolute rounded-lg w-full h-full bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-300 text-center bg-opacity-70 bg-gray-800 text-white text-sm font-sans cursor-pointer flex items-center justify-center"
            >
              Find your friesty flirts from FUN mode!
            </label>
          )}
        </div>
        <label className="absolute text-4xl pt-4 pl-20 left-20"><b>FUN</b></label>
      </div>
    </div>
  );
};

export default Modes;
