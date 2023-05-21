import React, { useState } from "react";
import "./Groups.css";
import { auth, firestore } from "../../utils/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { doc, collection, query as queries, setDoc } from "firebase/firestore";

const Groups = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentUser] = useAuthState(auth);
  const query = queries(collection(firestore, "Groups"));

  const [groups] = useCollectionData(query);

  //display form
  const handleCreateGroup = () => {
    setShowCreateForm(true);
  };

  //create a group with adding one member
  const handleFormSubmit = (formData) => {
    const groupName = formData.target.groupName.value;
    const description = formData.target.description.value;
    const collectionRef = collection(firestore, "Groups");
    setDoc(doc(collectionRef, groupName), {
      groupName: groupName,
      description: description,
      members: [
        JSON.stringify({
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
          displaName: currentUser.displayName,
        }),
      ],
      conversations: [],
      groupID: Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, "0"),
    })
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });

    setShowCreateForm(false);
  };

  return (
    <div className="group-list-container">
      <h2>Available Groups</h2>
      <ul className="group-list">
        {groups && groups.length > 0 ? (
          groups.map((group) => (
            <Link to="/groupchats" state={{ group }} key={group.groupID}>
              <li className="group-item">
                <h3>Group Name : {group.groupName}</h3>
                <h4>description : {group.description}</h4>
              </li>
            </Link>
          ))
        ) : (
          <h1>No Groups 🥲</h1>
        )}
      </ul>
      <button className="create-button" onClick={handleCreateGroup}>
        Create New Group
      </button>
      {showCreateForm && (
        <div className="form-overlay">
          <form className="create-group-form" onSubmit={handleFormSubmit}>
            <h2>Create New Group</h2>
            <input
              type="text"
              name="groupName"
              placeholder="Group Name"
            ></input>
            <input
              type="text"
              name="description"
              placeholder="Group Description"
            ></input>
            <button type="submit">Create</button>
            <button type="button" onClick={() => setShowCreateForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Groups;
