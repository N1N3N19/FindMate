import logo2 from '../src/assets/logo2.png';
import '../src/UserPlaceholder.css'
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const UserFinishPF = () => {
  
  const [isClicked, setIsClicked] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleClick = (id) => {
    
    if (selectedButtons.includes(id)) {
      
      
      setSelectedButtons(selectedButtons.filter(buttonId => buttonId !== id));
      
    } else if (selectedButtons.length < 5) {
      
      setSelectedButtons([...selectedButtons, id]);
      
    }
  };
  
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [About, setAbout] = useState('');

  const handleAbout = (e) => {
    e.preventDefault();
    setAbout(e.target.value);
    console.log("About:" + e.target.value);
  }
  return (
        <div>
          <div className="bg-white border border-amber-400 rounded-lg p-10 w-96 box-border shadow-lg backdrop-filter backdrop-blur-lg relative transition-all duration-200">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={logo2} alt="Logo" style={{ width: '75px', height: 'auto' }} />
                </div>
                <h1 className="text-3xl text-gray-950 font-bold mt-5 mb-1 text-center">One last step...</h1>
                <p className="text-center text-xs text-neutral-500 font-semibold" >Fill the remaining data below to finsish your profile</p>
            <div className="relative my-4">
              <label className="text-lg text-gray-500 py-2.5 pl-2"><b>About you</b></label>
              <input type="text" className="pb-10 pl-3 pt-3 text-sm text-neutral-500 bg-neutral-300 rounded-lg w-full focus:outline-none peer" placeholder="This is your bio..." onChange={handleAbout}></input>
            </div>
            <div className="relative my-4">
              <label className="text-lg text-gray-500 py-2.5 pl-2"><b>Interested in...</b></label>
              <ul role="list" class="pl-10 marker:text-gray-500 font-semibold  list-disc pl-5 space-y-3 text-slate-500">
                <li>Sports</li>
                  <div className="flex space-x-0.5">
                    
                    <input type="radio" id="basketball" name="tabs" className="absolute appearance-none" onClick={() => handleClick('basketball')} checked={selectedButtons.includes('basketball')} />
                      <label for="basketball" className = {selectedButtons.includes('basketball') ? "bg-gray-900 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white"}>Basketball</label>
                    <input type="radio" id="football" name="tabs" className="absolute appearance-none" onClick={() => handleClick('football') }checked={selectedButtons.includes('football')} />
                      <label for="football" className= {selectedButtons.includes('football') ? "bg-gray-900 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white"}>Football</label>
                    <input type="radio" id="volleyball" name="tabs" className="absolute appearance-none" onClick={() => handleClick('volleyball')} checked={selectedButtons.includes('volleyball')}/>
                      <label for="volleyball" className={selectedButtons.includes('volleyball') ? "bg-gray-900 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white"}>Volleyball</label>
                    <input type="radio" id="swimming" name="tabs" className="absolute appearance-none" onClick={() => handleClick('swimming')} checked={selectedButtons.includes('swimming')}/>
                      <label for="swimming" className={selectedButtons.includes('swimming') ? "bg-gray-900 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white"}>Swimming</label>
                    <input type="radio" id="badminton" name="tabs" className="absolute appearance-none" onClick={() => handleClick('badminton')} checked={selectedButtons.includes('badminton')}/>
                      <label for="badminton" className={selectedButtons.includes('badminton') ? "bg-gray-900 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white"}>Badminton</label>
                  </div>
                <li>Music</li>
                <div className="flex space-x-0.5">
                    <input type="radio" id="rock" name="tabs" className="absolute appearance-none" onClick={() => handleClick('rock')} checked={selectedButtons.includes('rock')}/>
                      <label for="rock" className={selectedButtons.includes('rock') ? "bg-gray-900 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white"}>Rock</label>
                    <input type="radio" id="jazz" name="tabs" className="absolute appearance-none" onClick={() => handleClick('jazz')} checked={selectedButtons.includes('jazz')}/>
                      <label for="jazz" className={selectedButtons.includes('jazz') ? "bg-gray-900 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white"}>Jazz</label>
                    <input type="radio" id="hiphop" name="tabs" className="absolute appearance-none" onClick={() => handleClick('hiphop')} checked={selectedButtons.includes('hiphop')}/>
                      <label for="hiphop" className={selectedButtons.includes('hiphop') ? "bg-gray-900 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white"}>Hip-hop</label>
                    <input type="radio" id="pop" name="tabs" className="absolute appearance-none" onClick={() => handleClick('pop')} checked={selectedButtons.includes('pop')}/>
                      <label for="pop" className={selectedButtons.includes('pop') ? "bg-gray-900 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white"}>Pop</label>
                    <input type="radio" id="country" name="tabs" className="absolute appearance-none" onClick={() => handleClick('country')} checked={selectedButtons.includes('country')}/>
                      <label for="country" className={selectedButtons.includes('country') ? "bg-gray-900 text-white cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400" : "bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white"}>Country</label>
                  </div>             
                <li>Movie</li>
                  <div className="flex space-x-0.5">
                    <input type="radio" id="romantic" name="tabs" className="absolute appearance-none" />
                      <label for="romantic" className="bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white">Romantic</label>
                    <input type="radio" id="horror" name="tabs" className="absolute appearance-none" />
                      <label for="horror" className="bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white">Horror</label>
                    <input type="radio" id="comedy" name="tabs" className="absolute appearance-none" />
                      <label for="comedy" className="bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white">Comedy</label>
                    <input type="radio" id="action" name="tabs" className="absolute appearance-none" />
                      <label for="action" className="bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white">Action</label>
                    <input type="radio" id="scifi" name="tabs" className="absolute appearance-none" />
                      <label for="scifi" className="bg-neutral-200 text-neutral-400 cursor-pointer w-24 flex items-center justify-center select-none text-xs rounded-full py-1 border border-12 border-neutral-400 hover:bg-gray-900 hover:text-white">Sci-fi</label>
                  </div>   
              </ul>
            </div>
            <button className="w-full wtext-[18px] mt-4 rounded-full bg-orange-600 text-white hover:ring-1 ring-amber-400 hover:bg-white hover:text-orange-600 py-2 transition-colors duration-300" type="submit"><b>NEXT</b></button>
          </div>
          <div className="relative my-2 text-center">
            <span className="text-blue-gray-100">Wolfgang: Triple-N © 2023</span>
          </div>
        </div>
    );
};

export default UserFinishPF;