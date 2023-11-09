import { BsGenderAmbiguous } from "react-icons/bs";
import {BiUser} from "react-icons/bi";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div>
    <div className="bg-white border border-stone-300 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg relative transition-all duration-200">
      <h1 className="text-4xl text-gray-950 font-bold text-center mb-8">Registration</h1>
      <form>
        <div className="relative my-4">
            <input type="text" className="block w-72 py-2.5 px-0 text-sm text-neutral-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-400 focus:outline-none focus:ring-0 focus:text-white focus:border-amber-400 peer" placeholder=" " />
            <label className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-400 peer-focus:dark:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name...</label>
            <BiUser className="absolute top-4 right-1 text-black"/>
        </div>
        <div className="relative my-4">
            <input type="text" className="block w-72 py-2.5 px-0 text-sm text-neutral-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-400 focus:outline-none focus:ring-0 focus:text-white focus:border-amber-400 peer" placeholder=" " />
            <label className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-400 peer-focus:dark:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name...</label>
            <BiUser className="absolute top-4 right-1 text-black"/>
        </div>
        <div className="relative my-4">
            <input type="text" className="block w-72 py-2.5 px-0 text-sm text-neutral-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-400 focus:outline-none focus:ring-0 focus:text-white focus:border-amber-400 peer" placeholder=" " />
            <label className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-400 peer-focus:dark:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender...</label>
            <BsGenderAmbiguous className='absolute top-4 right-1 text-black'/>
        </div>
        <div className="relative my-8">
            <p className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-400 peer-focus:dark:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date Of Birth</p>
            <input type="date" className="block w-72 py-2.5 px-0 text-sm text-neutral-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-400 focus:outline-none focus:ring-0 focus:text-white focus:border-amber-400 peer" placeholder=" " />
        </div>
         <button className="w-full mb-2 text-[18px] mt-2 rounded-full bg-orange-600 text-white hover:border border-amber-400 hover:bg-white hover:text-orange-600 py-2 transition-colors duration-300" type="submit"><b>NEXT</b></button>

        <div className='mt-2 items-center'>
          <div className="text-center">
          </div>
        </div>
      </form>
    </div>
  </div>

  );
};

export default Registration;
