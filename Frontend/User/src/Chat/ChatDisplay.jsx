import { useEffect,useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";


const ChatDisplay = ({user, clickedUser}) => {
    const userIDs = user?.user_ID
    const clickedUserID = clickedUser?.user_ID
    const [usersMessages, setUsersMessages] = useState(null) 
    const [clickedUsersMessages, setClickedUserMessages] = useState(null)
     
    const getMessages = async () => {  
        try {
            
            const response = await axios.get('http://localhost:5001/api/user/getMessage', 
            { params: { userID: userIDs, otherID: clickedUserID } 
        });
            // console.log("response",response.data)
            setUsersMessages(response.data)
            
            
          } catch (error) {
            console.error(error);
          }
    }
    
    const getClickedUserMessages = async (sender_ID, receiver_ID) => {  
        try {
            
            const response = await axios.get('http://localhost:5001/api/user/getMessage', 
            { params: { userID: clickedUserID, otherID: userIDs } 
        });
            // console.log("response",response.data)
          setClickedUserMessages(response.data)
            
            
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {  
        if(userIDs && clickedUserID){
            getMessages()
            getClickedUserMessages()
          }
    },[])

    const messages = []
    
  

    usersMessages?.forEach( message => {
        const formattedMessage = {}
        formattedMessage["name"] = user?.Name
        formattedMessage["img"] = user?.Profile_pic
        formattedMessage["message"] = message.msg_text
        formattedMessage["timestamp"] = message.timestamp
        messages.push(formattedMessage)
    })

    clickedUsersMessages?.forEach( message => {
        const formattedMessage = {}
        formattedMessage["name"] = clickedUser?.Name
        formattedMessage["img"] = clickedUser?.Profile_pic
        formattedMessage["message"] = message.msg_text
        formattedMessage["timestamp"] = message.timestamp
        messages.push(formattedMessage)
    })

    const descendingOrderMessages = messages?.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    console.log("descendingOrderMessages",descendingOrderMessages)
    // console.log("usersMessages",usersMessages)
    // console.log("formattedMessage", messages)
    return (
        <>
        <Chat descendingOrderMessages={descendingOrderMessages}/>
        <ChatInput user = {userIDs} clickedUser = {clickedUserID} getUserMessages={getMessages} getClickedUserMessages={getClickedUserMessages}/>
        </>
    
)}

export default ChatDisplay;