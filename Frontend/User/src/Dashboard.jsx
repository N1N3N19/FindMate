import TinderCard from 'react-tinder-card';
import ChatContainer from './Chat/ChatContainer';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [cookies, setCookies, removeCookies] = useCookies(['user'])

    const userID = cookies.userID
    
    const getUser = async () => {
        
        
        try {
            const response = await axios.get('http://localhost:5001/api/user/getUser', { params: { params: userID } });
            setUser(response.data);
            
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        getUser()
    }, [user]
    )
    
    


    const character = [{

        name: 'Richard Hendricks',
        url: 'https://i.pinimg.com/originals/7d/3d/4f/7d3d4f0c0b4b1f2f0c6d8c4f0c0e0b8b.jpg'
        },
        {
        },
        {
        name: 'Erlich Bachman'
        },
        {
        name: 'Monica Hall'
        }
        
]
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }


    
    return (    
        <div className="dashboard">
         
            <ChatContainer user={user}/>
             <div className='swipe-container'>
                <div className='card-container'>
                   
                    {character.map((character) => (
                    <TinderCard
                        className="swipe"
                        key={character.name}
                        onSwipe={(dir) => swiped(dir, character.name)}
                        onCardLeftScreen={() => outOfFrame(character.name)}>
                        <div
                            style={{backgroundImage: "url(" + character.url + ")"}}
                            className="card">
                            <h3>{character.name}</h3>
                        </div>
                    </TinderCard>
                    ))}
                    <div className ="swipe-info"> <p>You swiped {lastDirection}</p></div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;