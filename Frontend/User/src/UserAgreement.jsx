import oui from '../src/assets/oui.jpg';
import '../src/UserPlaceholder.css'

const UserAgreement = () => {
    return (
        <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage": "url('../src/assets/bg.jpg')"}}>
          <div> 
            <h1 className="text-center text-3xl pb-2"><strong>Terms & Conditions and Privacy Policy</strong></h1>
          </div>
          <div className="bg-white border border-amber-400 rounded-lg p-10 w-full box-border shadow-lg backdrop-filter backdrop-blur-lg relative transition-all duration-200">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img src={oui} alt="oui" style={{ width: 'auto', height: 'auto' }} />
            </div>
          </div>
          <div className="relative my-2 text-center">
            <span className="text-blue-gray-100">Wolfgang: Triple-N © 2023</span>
          </div>
        </div>
    );
};

export default UserAgreement;