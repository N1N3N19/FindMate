import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const MatchesDisplay = ({matches, setClickedUser}) => {
    // console.log(matches.user_b)
    const userID = matches?.user_b
    const [ matchedProfile, setMatches] = useState(null)
    
    const getMatches = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/user/getUser', 
            { params: { params: userID } });
            await setMatches(response.data);
            console.log(response.data)
            
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        getMatches()
    },[matches])

    const profile = [matchedProfile]
    // console.log("sss",matchedProfile)
    return (
        <div className="matches-display">
            { matchedProfile &&  (
                    <div className="match-card" onClick = {() => setClickedUser(matchedProfile.user_ID)} >
                       <div className="img-container">
                            <img src={matchedProfile.Profile_pic} alt={matchedProfile.Name + "profile"}/>
                       </div>
                       <h3> {matchedProfile.Name}</h3>
                    </div>
                )
}
            
        </div>
    
    
)}

export default MatchesDisplay;