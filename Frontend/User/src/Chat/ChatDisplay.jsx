import { useEffect,useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatDisplay = ({user, clickedUser}) => {
    const userID = user.user_ID
    const clickedUserID = clickedUser.user_ID
    const [usersMessages, setUsersMessages] = useState(null) 
    const [clickedUsersMessages, setClickedUserMessages] = useState(null)
     
    const getMessages = async (sender_ID, receiver_ID) => {  
        try {
            console.log("sender_ID",sender_ID)
            console.log("receiver_ID",receiver_ID)
            const response = await axios.get('http://localhost:5001/api/user/messages', 
            { params: { sender_ID: sender_ID, receiver_ID: receiver_ID } 
        });
        console.log("wa",response.data)
            return response.data
            
            
          } catch (error) {
            console.error(error);
          }
    }
    // useEffect(() => {  
    //     if(userID && clickedUserID){
    //     setUsersMessages(getMessages(userID, clickedUserID))
    //     setClickedUserMessages(getMessages(clickedUserID, userID))
    //     }
    // },[usersMessages])

    const messages = []
    const userMSG = [usersMessages]
  
    // userMSG?.forEach( msg_text,timestamp => {
    //     const formattedMessage = {}
    //     formattedMessage["name"] = user?.Name
    //     formattedMessage["img"] = user?.Profile_pic
    //     formattedMessage["message"] = msg_text
    //     formattedMessage["timestamp"] = timestamp
    //     messages.push(formattedMessage)
    // })

    console.log("usersMessages",usersMessages)
    console.log("formattedMessage", messages)
    return (
        <>
        <Chat/>
        <ChatInput/>
        </>
    
)}

export default ChatDisplay;