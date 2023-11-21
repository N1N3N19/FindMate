import TinderCard from 'react-tinder-card';
import ChatContainer from './Chat/ChatContainer';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useCookies } from 'react-cookie'



const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [cookies, setCookies, removeCookies] = useCookies(['user'])
    const [modeUser, setModeUser] = useState(null)
    const userID = cookies.userID
    const [lastDirection, setLastDirection] = useState()
    const [matchedUserID, setMatchedUserID] = useState()
    const [getMatchedUser, setGetMatchedUser] = useState() 


    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/user/getUser', 
            { params: { params: userID } });
            await setUser(response.data);
            console.log(response.data)
            
          } catch (error) {
            console.error(error);
          }
    }

    
    const getMatched = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/user/getMatchedUser', 
            { params:{userID }} );
            await setGetMatchedUser(response.data);
            console.log("matched",response.data)
            
          } catch (error) {
            console.error(error);
          }
    }
    
    const getOther = async (mode_pref,show_me) => {
     
        try {
            const response = await axios.get('http://localhost:5001/api/user/getUserByMode', 
            { params: { userID, show_me, mode_pref } });
            await setModeUser(response.data);
            console.log(character)
            
            
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        getUser()

    },[])

    useEffect(() => {
        if(user){
            if(user.show_me && user.mode_pref ){
                getOther(user.mode_pref,user.show_me)
                }
            if(user.user_ID ){
                getMatched()
            } 
        }
    }, [user]
    )

    const updateMatch = async (matchedUserID, lastDirection) => {
        const dataToSend = { userID, otherID: matchedUserID, swipe_state: lastDirection };
        console.log(dataToSend);
        try {
            const response = await fetch('http://localhost:5001/api/user/swipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log(data);
                console.log('API Response:', data);
                // Redirect logic here
            } else {
                console.error('Sign-up failed:', data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    const swiped = (direction, swipeUserID) => {
        console.log('removing: ' + swipeUserID);
        if(direction === 'right'){
            updateMatch(swipeUserID, "right")
        }
        if(direction === 'left'){
            updateMatch(swipeUserID,'left')
    }   
}

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    
    const character = [modeUser]
   

    return (    
        <div className="dashboard">
         
            <ChatContainer user={user}/>
             <div className='swipe-container'>
                <div className='card-container'>
                   
                    {Array.isArray(character[0]) && character[0].map((user) => (
                            user ?(
                                user.Name && user.Profile_pic && user.user_ID ?(
                                <TinderCard
                                    className="swipe"
                                    key={user.user_ID}
                                    onSwipe={(dir) => {
                                        setLastDirection(dir);
                                        swiped(dir, user.user_ID);
                                    
                                        
                                    }}
                                    
                                    onCardLeftScreen={() => outOfFrame(user.Name)}>
                                    <div
                                        style={{backgroundImage: "url(" + user.Profile_pic + ")"}}
                                        className="card">
                                        <h3>{user.Name}</h3>
                                    </div>
                                </TinderCard>
                                ) : null
                            ):null
                            )
                        )
                    }
                    <div className ="swipe-info"> <p>You swiped {lastDirection}</p></div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;