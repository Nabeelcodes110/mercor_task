import React from "react";
import "./Users.css";
import Card from "../../components/Card/Cards";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../utils/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { doc, collection, query as queries, setDoc } from "firebase/firestore";

const Users = () => {
  const [currentUser] = useAuthState(auth);
  const query = queries(collection(firestore, "Users"));

  const [usersData] = useCollectionData(query);

  return (
    <div className="component-list">
      <h1>Users</h1>
      <ul className="component-list__items">
        {usersData &&
          usersData?.map(
            (user) =>
              currentUser.uid !== user.uid && (
                <Link
                  to="/chats"
                  state={{ user }}
                  className="link"
                  key={user.uid}
                >
                  <li className="component-list__item">
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
