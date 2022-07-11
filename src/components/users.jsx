import { database } from "../Assets/api";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Assets/usercontext";
import Kudos from "./kudos";

const Users = () => {
  const { username } = useParams();
  const [allUsers, setAllUsers] = useState([]);
  const { setUser, user } = useContext(UserContext);
  useEffect(() => {
    database
      .get("/users", {
        params: {
          username: username,
        },
      })
      .then((res) => {
        setAllUsers(res.data.users);
      });
  });
  return (
    <section className="Main">
      {!allUsers.length ? (
        <p className="loading">...Loading users</p>
      ) : (
        <ul className="allItemsList">
          {allUsers.map((userData) => {
            return (
              <div key={userData.username} className="itemCard">
                <section className="itemImage">
                  <img src={userData.avatar_url} alt={userData.username} />
                </section>
                <section className="itemText">
                  <p>Username: {userData.username}</p>
                  <p>kudos: {userData.kudos} </p>
                </section>
                <button
                  onClick={() => {
                    if(window.confirm(`Log in as ${userData.username}`)) setUser(userData);
                   
                  }}
                >
                  Select This User
                </button>
                <Kudos kudosCount={userData.kudos} name={userData.username}/>
              </div>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Users;
