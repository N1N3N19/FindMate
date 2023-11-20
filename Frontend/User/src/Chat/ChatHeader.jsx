import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
const ChatHeader = ({user}) => {
    if (!user) {
        return null; // or return a loading spinner, or some placeholder content
    }
    const navigate = useNavigate()
    const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
    const logout = () => {
        removeCookie('userID', cookies.userID)
        removeCookie('AuthToken', cookies.AuthToken)
        removeCookie('email', cookie.email);
        navigate('/');
    }
    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">    
                    <img src={user["Profile_pic"]} />    
                </div>  
            </div>
            <h3>{user.Name}</h3>
            <i className="log-out-icon" onClick={logout}>⇦</i>
    
        </div>
        
    
)}

export default ChatHeader;