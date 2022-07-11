import { useContext } from "react";
import { UserContext } from "../Assets/usercontext";

  

const User=()=>{
    const user = useContext(UserContext);
    console.log(user.user)
    return (
        (user.user.username)?
        (<section className="user">
            <img id='avatar' src={user.user.avatar_url} alt='user'/>
            <p id='loggedUser'>{user.user.username}</p>
        </section>) : <p>Log in</p>
    )
}
export default User;