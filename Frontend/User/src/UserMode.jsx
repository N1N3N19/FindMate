import Modes from './Modes'
import '../src/UserPlaceholder.css';

const UserMode = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-5xl pb-5"><strong>What kind of <i>mate</i> are you <i>finding?</i></strong></h1>
        <p className="text-xl pb-10">Declare your desire by selecting only one mode to continue...</p>
      </div>
      <div>
        <Modes />
      </div>
    </div>
  );
};

export default UserMode;
