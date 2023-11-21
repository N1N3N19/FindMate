import React from 'react';
import { Link } from "react-router-dom";
import '../src/UserPlaceholder.css';
import { BsLightningFill } from "react-icons/bs";
import defaultAvatar from '../src/assets/avatar.png';

const TerminateMate = () => {
  return (
    <div className='text-white h-[100vh] flex flex-col justify-center items-center bg-cover' style={{ "backgroundImage": "url('../src/assets/bg.jpg')" }}>
      <div className="bg-white text-gray-900 border border-amber-400 rounded-lg p-8 w-550px box-border shadow-lg backdrop-filter backdrop-blur-lg relative transition-all duration-200" style={{ width: '500px' }}>
        <div className="relative text-center my-4">
          <h className="text-3xl font-bold">Terminate Mate Completed!</h>
        </div>
        <div className="flex items-center justify-center my-4">
          <div className="rounded-full overflow-hidden h-32 mr-2">
            <img src={defaultAvatar} alt="User1" className="h-full w-full object-cover" />
          </div>
          <div className="text-8xl text-orange-600 mr-2">
            <BsLightningFill />
          </div>
          <div className="rounded-full overflow-hidden h-32">
            <img src={defaultAvatar} alt="User2" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="text-center font-semibold">
          <p>You & <i>[username]</i> are no longer each other's mate.</p>
        </div>
        <div className="relative my-2">
          <p className="text-lg font-bold text-gray-900 py-2.5 pl-2">Tell us why you terminate <i>[username]</i>?</p>
          <label className="text-md text-gray-500 py-2.5 pl-2"><b>More:</b></label>
          <textarea
            className="pb-10 p-4 pt-4 text-sm text-neutral-500 bg-neutral-300 rounded-lg w-full focus:outline-none peer break-words resize-none"
            placeholder="Type here..."
          ></textarea>
        </div>
        <button className="w-full text-[18px] mt-4 rounded-full bg-orange-600 text-white hover:ring-1 ring-amber-400 hover:bg-white hover:text-orange-600 py-2 transition-colors duration-300" type="submit"><b>SEND</b></button>
        <div className="relative pt-4 text-center">
                <Link className="text-neutral-500 hover:text-orange-600" to='/Agreement' ><u>Report issues</u></Link>
        </div>
      </div>
      <div className="text-center p-4">
        <span>Wolfgang: Triple-N © 2023</span>
      </div>
    </div>
  );
};

export default TerminateMate;