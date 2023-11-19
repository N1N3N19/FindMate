import logo2 from '../src/assets/logo2.png';
import '../src/UserPlaceholder.css'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const UserFinishPF = () => {
  const [genderOptions, setGenderOptions] = useState([]);
  const [preferredGender, setPreferredGender] = useState('');

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/genders');
        const data = await response.json();
        setGenderOptions(data);
      } catch (error) {
        console.error('Error fetching genders:', error);
      }
    };

    fetchGenders();
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleGenderChange = (gender) => {
    setPreferredGender(gender);
  };

  const [isClicked, setIsClicked] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [About_user, setAbout] = useState('');
  const  userID  = cookies.userID;
  const handleClick = (id) => {
    
    if (selectedButtons.includes(id)) {
      
      
      setSelectedButtons(selectedButtons.filter(buttonId => buttonId !== id));
      
    } else if (selectedButtons.length < 5) {
      
      setSelectedButtons([...selectedButtons, id]);
      
    }
  };
  
 
  const navigate = useNavigate();

  const handleAbout = (e) => {
    e.preventDefault();
    setAbout(e.target.value);
    console.log("About:" + e.target.value);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const dataTosend = {userID, About_user,selectedButtons};
    
    const response = await fetch(`http://localhost:5001/api/user/about`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataTosend),
    });

    const response2 = await fetch(`http://localhost:5001/api/user/interested`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataTosend),
    });
    const data1 = await response.json();
    const data2 = await response2.json();
    
    if (response.ok) {
      // Handle success
      console.log(data1.message);
      console.log(data2.message);
      navigate(`/Signin`);
  } else {
      // Handle error
      console.error('Insert failed:', data1.message);
      console.error('Insert failed:', data2.message);
  }

    
  }

  
  return (
        <div className='text-white h-[100vh] flex flex-col justify-center items-center bg-cover' style={{ "backgroundImage": "url('../src/assets/bg.jpg')" }}>
          <div className="bg-white border border-amber-400 rounded-lg p-10 w-96 box-border shadow-lg backdrop-filter backdrop-blur-lg relative transition-all duration-200" style={{ width: '400px'}}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={logo2} alt="Logo" style={{ width: '75px', height: 'auto' }} />
                </div>
                <h1 className="text-3xl text-gray-950 font-bold mt-5 mb-1 text-center">One last step...</h1>
                <p className="text-center text-xs text-neutral-500 font-semibold" >Fill the remaining data below to finish your profile</p>
            <div className="relative my-4">
              <label className="text-lg text-gray-500 pt-5 py-2.5 pl-2"><b>About you</b></label>
              <textarea
            className="flex pb-10 p-3 pt-3 w-full text-sm text-neutral-500 bg-neutral-300 rounded-lg focus:outline-none peer resize-none"
            placeholder="This is your bio..."
            onChange={handleAbout}
          ></textarea>
            </div>
            <div className="relative my-4">
              <label className="text-lg text-gray-500 py-2.5 pl-2"><b>Your interests </b>(up to 5)</label>
              <ul role="list" class="pl-10 marker:text-gray-500 font-semibold list-disc pl-5 space-y-3 text-slate-500">
                <li>Sports</li>
                  <div className="flex space-x-0.5">
                    <input type="radio" id="basketball" name="tabs" className="absolute appearance-none" onClick={() => handleClick('basketball')} checked={selectedButtons.includes('basketball')} />
                      <label for="basketball" className = {selectedButtons.includes('basketball') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:opacity-60 hover:bg-amber-400 hover:border-orange-400 hover:text-white"}>Basketball</label>
                    <input type="radio" id="football" name="tabs" className="absolute appearance-none" onClick={() => handleClick('football') }checked={selectedButtons.includes('football')} />
                      <label for="football" className= {selectedButtons.includes('football') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400  hover:opacity-60 hover:bg-amber-400 hover:border-orange-400 hover:text-white"}>Football</label>
                    <input type="radio" id="volleyball" name="tabs" className="absolute appearance-none" onClick={() => handleClick('volleyball')} checked={selectedButtons.includes('volleyball')}/>
                      <label for="volleyball" className={selectedButtons.includes('volleyball') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:opacity-60 hover:bg-amber-400 hover:border-orange-400 hover:text-white"}>Volleyball</label>
                    <input type="radio" id="swimming" name="tabs" className="absolute appearance-none" onClick={() => handleClick('swimming')} checked={selectedButtons.includes('swimming')}/>
                      <label for="swimming" className={selectedButtons.includes('swimming') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:opacity-60 hover:bg-amber-400 hover:border-orange-400 hover:text-white"}>Swimming</label>
                    <input type="radio" id="badminton" name="tabs" className="absolute appearance-none" onClick={() => handleClick('badminton')} checked={selectedButtons.includes('badminton')}/>
                      <label for="badminton" className={selectedButtons.includes('badminton') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:opacity-60 hover:bg-amber-400 hover:border-orange-400 hover:text-white"}>Badminton</label>
                  </div>
                <li>Music</li>
                <div className="flex space-x-0.5">
                    <input type="radio" id="rock" name="tabs" className="absolute appearance-none" onClick={() => handleClick('rock')} checked={selectedButtons.includes('rock')}/>
                      <label for="rock" className={selectedButtons.includes('rock') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-amber-400 hover:opacity-60 hover:border-orange-400 hover:text-white"}>Rock</label>
                    <input type="radio" id="jazz" name="tabs" className="absolute appearance-none" onClick={() => handleClick('jazz')} checked={selectedButtons.includes('jazz')}/>
                      <label for="jazz" className={selectedButtons.includes('jazz') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-amber-400 hover:opacity-60 hover:border-orange-400 hover:text-white"}>Jazz</label>
                    <input type="radio" id="hiphop" name="tabs" className="absolute appearance-none" onClick={() => handleClick('hiphop')} checked={selectedButtons.includes('hiphop')}/>
                      <label for="hiphop" className={selectedButtons.includes('hiphop') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-cgienter justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-amber-400 hover:opacity-60 hover:border-orange-400 hover:text-white"}>Hip-hop</label>
                    <input type="radio" id="pop" name="tabs" className="absolute appearance-none" onClick={() => handleClick('pop')} checked={selectedButtons.includes('pop')}/>
                      <label for="pop" className={selectedButtons.includes('pop') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-amber-400 hover:opacity-60 hover:border-orange-400 hover:text-white"}>Pop</label>
                    <input type="radio" id="country" name="tabs" className="absolute appearance-none" onClick={() => handleClick('country')} checked={selectedButtons.includes('country')}/>
                      <label for="country" className={selectedButtons.includes('country') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-amber-400 hover:opacity-60 hover:border-orange-400 hover:text-white"}>Country</label>
                  </div>             
                <li>Movies</li>
                  <div className="flex space-x-0.5">
                    <input type="radio" id="romantic" name="tabs" className="absolute appearance-none" onClick={() => handleClick('romantic')} checked={selectedButtons.includes('romantic')}/>
                      <label for="romantic" className={selectedButtons.includes('romantic') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-amber-400 hover:opacity-60 hover:border-orange-400 hover:text-white"}>Romantic</label>
                    <input type="radio" id="horror" name="tabs" className="absolute appearance-none" onClick={() => handleClick('horror')} checked={selectedButtons.includes('horror')}/>
                      <label for="horror" className={selectedButtons.includes('horror') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-amber-400 hover:opacity-60 hover:border-orange-400 hover:text-white"}>Horror</label>
                    <input type="radio" id="comedy" name="tabs" className="absolute appearance-none" onClick={() => handleClick('comedy')} checked={selectedButtons.includes('comedy')}/>
                      <label for="comedy" className={selectedButtons.includes('comedy') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-amber-400 hover:opacity-60 hover:border-orange-400 hover:text-white"}>Comedy</label>
                    <input type="radio" id="action" name="tabs" className="absolute appearance-none" onClick={() => handleClick('action')} checked={selectedButtons.includes('action')}/>
                      <label for="action" className={selectedButtons.includes('action') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-amber-400 hover:opacity-60 hover:border-orange-400 hover:text-white"}>Action</label>
                    <input type="radio" id="scifi" name="tabs" className="absolute appearance-none" onClick={() => handleClick('scifi')} checked={selectedButtons.includes('scifi')}/>
                      <label for="scifi" className={selectedButtons.includes('scifi') ? "border-12 border-orange-600 bg-amber-400 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:opacity-60 hover:bg-amber-400 hover:border-orange-400 hover:text-white"}>Sci-fi</label>
                  </div>
              </ul>
            </div>
             <div className="relative my-4">
      <div className="relative my-4">
      <label className="text-lg text-gray-500 py-2.5 pl-2">
        <b>Show me</b>
      </label>
          <select
              className="rounded-full w-full py-2.5 pl-3 mt-1 text-sm text-neutral-400 bg-neutral-300 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400"
              value={preferredGender}
              onChange={handleGenderChange}
            >
              <option value="" disabled>Select your preferred gender</option>
              {genderOptions.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
          </select>
    </div>
    </div>
            <button className="w-72 wtext-[18px] mt-4 rounded-full bg-orange-600 text-white hover:ring-1 ring-amber-400 hover:bg-white hover:text-orange-600 py-2 transition-colors duration-300" type="submit" onClick={handleSubmit}><b>CREATE YOUR PROFILE</b></button>
          </div>
          <div className="relative my-2 text-center">
            <span>Wolfgang: Triple-N © 2023</span>
          </div>
        </div>
    );
};

export default UserFinishPF;