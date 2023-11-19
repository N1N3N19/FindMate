import { useCookies } from 'react-cookie'

const ChatHeader = ({user}) => {
    if (!user) {
        return null; // or return a loading spinner, or some placeholder content
    }
    const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
    const logout = () => {
        removeCookie('userID', cookies.userID)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
    }
    return (
        <div className="chat-container-header">
            <div className="profile">
                <img src={user["Profile_pic"]} />      
            </div>
            <h3>{user.Name}</h3>
            <i className="log-out-icon" onClick={logout}>⇦</i>
    
        </div>
        
    
)}

export default ChatHeader;