import ChatHeader from "./chatheader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";

const ChatContainer = () => {
    return (
        <div className='text-white h-[100vh] flex flex-col justify-center items-center bg-cover' style={{ "backgroundImage": "url('../src/assets/bg.jpg')" }}>
            <div className="chat-container"> 
                <ChatHeader/>

                <div>
                    <button className="option">Matches</button>
                    <button className="option">Messages</button>
                </div>

                <MatchesDisplay/>

                <ChatDisplay/>
            </div>
        </div>
    
)}

export default ChatContainer;