import { useState} from 'react'
import axios from 'axios'

const ChatInput = ({user, clickedUser, getUserMessages, getClickedUserMessages}) => {
    const [textArea, setTextArea] = useState("")
    const userId = user
    const clickedUserId = clickedUser

    const addMessage = async (sender_ID, receiver_ID, msg_text) => {
       
            try {
                const response = await axios.post('http://localhost:5001/api/user/message', 
                { userID: sender_ID, otherID: receiver_ID, msg_text });
               
                getUserMessages()
                getClickedUserMessages()
                setTextArea("")
                console.log(response.data)
            
            
            }
            catch (error) {
                console.error(error);
            }
    }
    return (
        <div className="chat-input">
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="secondary-button" onClick={() => addMessage(userId, clickedUserId, textArea)}>Submit </button>
            <button className="secondary-button">Report </button>
        </div>
    
)}

export default ChatInput;