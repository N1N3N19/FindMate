import React from 'react';
import { Link } from "react-router-dom";
import '../src/UserPlaceholder.css';
import { BsLightningFill } from "react-icons/bs";
import defaultAvatar from '../src/assets/avatar.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';


const TerminateMate = () => {
  const [feedback, setFeedback] = useState("")
  const [cookies, setCookies, removeCookies] = useCookies(['user'])
  const [pic1, setPic1] = useState('')
  const [pic2, setPic2] = useState('')
  const userName = cookies.clickedUser
  const user = cookies.userID
  const reportID = cookies.reportID
  const navigate = useNavigate()
  const handle_feedback = (e) => {
    e.preventDefault();
    setFeedback(e.target.value);
    console.log("feedback:" + e.target.value);
  };

  const getUser = async (userID) => {
    try{
    const response1 = await axios.get('http://localhost:5001/api/user/getUser',
    { params: { params: userID } });
    console.log(response1.data.Profile_pic)
    return(response1.data.Profile_pic)
    
    
    }
    catch (error) {
        console.error(error);
    }
}

useEffect(() => {
  const fetchUserPictures = async () => {
    if (user && reportID) {
      const userPic1 = await getUser(user);
      const userPic2 = await getUser(reportID);
      setPic1(userPic1);
      setPic2(userPic2);
    }
  };

  fetchUserPictures();
}, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataTosend = { feedback, user, reportID };
    console.log(dataTosend)
    try{
    const response = await axios.post(`http://localhost:5001/api/user/terminateMate`, 
    { feedback, user, reportID});
      console.log(response.data)
     
        removeCookies('reportID')
        removeCookies('clickedUser')
        navigate('/Home')
      
    }
      catch (error) {
        console.error(error);
      }
    };
  return (
    <div className='text-white h-[100vh] flex flex-col justify-center items-center bg-cover' style={{ "backgroundImage": "url('../src/assets/bg.jpg')" }}>
      <div className="bg-white text-gray-900 border border-amber-400 rounded-lg p-8 w-550px box-border shadow-lg backdrop-filter backdrop-blur-lg relative transition-all duration-200" style={{ width: '500px' }}>
        <div className="relative text-center my-4">
          <h className="text-3xl font-bold">Terminate Mate Completed!</h>
        </div>
        <div className="flex items-center justify-center my-4">
          <div className="rounded-full h-32 w-32 mr-2 overflow-hidden">
            <img src={pic1} alt="User1" className="h-full w-full object-cover" />
          </div>
          <div className="text-8xl text-orange-600 mr-2">
            <BsLightningFill />
          </div>
          <div className="rounded-full h-32 w-32 mr-2 overflow-hidden">
            <img src={pic2} alt="User2" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="text-center font-semibold">
          <p>You & <i>{userName}</i> are no longer each other's mate.</p>
        </div>
        <div className="relative my-2">
          <p className="text-lg font-bold text-gray-900 py-2.5 pl-2">Tell us why you terminate <i>{userName }</i>?</p>
          <label className="text-md text-gray-500 py-2.5 pl-2"><b>More:</b></label>
          <textarea
            className="pb-10 p-4 pt-4 text-sm text-neutral-500 bg-neutral-300 rounded-lg w-full focus:outline-none peer break-words resize-none"
            placeholder="Type here..."
            onChange={handle_feedback}
          ></textarea>
        </div>
        <button className="w-full text-[18px] mt-4 rounded-full bg-orange-600 text-white hover:ring-1 ring-amber-400 hover:bg-white hover:text-orange-600 py-2 transition-colors duration-300" type="submit" onClick={handleSubmit}><b>SEND</b></button>
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