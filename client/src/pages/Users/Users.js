import React from "react";
import "./Users.css";
import Card from "../../components/Card/Cards";
import { Link } from "react-router-dom";
import { auth } from "../../utils/config";
import { useAuthState } from "react-firebase-hooks/auth";
// import { admin } from "../../utils/adminConfig";
import axios from "axios";

let usersData;
await axios
  .get("http://localhost:5000/api/users")
  .then((response) => {
    usersData = response.data.payload.users;
  })
  .catch((err) => {
    usersData = [];
  });

const Users = () => {
  const [currentUser] = useAuthState(auth);
  return (
    <div className="component-list">
      <h1>Users</h1>
      <ul className="component-list__items">
        {usersData.map(
          (user) =>
            currentUser.uid !== user.uid && (
              <Link to="/chats" state={{ user }} className="link">
                <li key={user.uid} className="component-list__item">
                  <Card
                    name={user.displayName}
                    profilePhoto={user.photoURL}
                    uid={user.uid}
                  />
                </li>
              </Link>
            )
        )}
      </ul>
    </div>
  );
};

export default Users;
