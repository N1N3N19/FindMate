import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'
import { useState } from 'react'

const ChatContainer = ({ user, matches }) => {
    const [ clickedUser, setClickedUser ] = useState(null)
 
    // console.log(matches)
    return (
        <div className="chat-container">
            <ChatHeader user={user}/>

            <div>
                <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
            </div>
                { matches && !clickedUser &&(
                <MatchesDisplay matches={matches} setClickedUser={setClickedUser}/>)}
            { clickedUser && (<ChatDisplay user={user} clickedUser={clickedUser}/>)}
        </div>
    )
}

export default ChatContainer