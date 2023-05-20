import React, { useState } from "react";
import "./Chats.css";
import { useLocation } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../utils/config";
import {
  doc,
  onSnapshot,
  collection,
  query as queries,
  where,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const Chats = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const userData = location.state?.user;

  const msgRef = collection(firestore, "Direct Messages");
  const query = queries(
    collection(firestore, "Direct Messages"),
    where("sender", "==", user.uid),
    where("reciever", "==", userData.uid)
  );
  const docRef = doc(firestore, "Direct Messages", user.uid);

  getDoc(docRef)
    .then((data) => {
      if (data.exists()) {
        // console.log(data);
      } else {
        setDoc(doc(firestore, "Direct Messages", user.uid), {
          sender: user.uid,
          reciever: userData.uid,
          messages: [],
        })
          .then(() => {
            console.log("New document created successfully!");
          })
          .catch((error) => {
            console.error("Error creating new document:");
          });
      }
    })
    .catch((err) => console.log(err));

  // const [msgs] = useCollectionData(query, { idField: "id" });
  const [msgs] = useCollectionData(query);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      updateDoc(
        docRef,
        {
          messages: arrayUnion(
            JSON.stringify({
              sender: user.uid,
              reciever: userData.uid,
              text: inputValue,
              timeStamp: Date.now,
              textID: Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, "0"),
            })
          ),
        },
        { merge: true }
      );
      setInputValue("");
    }
  };

  return (
    <>
      <div className="chat-container">
        <nav>
          <div className="navbar-container">
            <div className="user-profile">
              <img src={userData.photoURL} alt="Profile" />
              <span>{userData.displayName}</span>
            </div>
          </div>
        </nav>
        <div className="messages-container">
          {msgs &&
            msgs[0].messages.map((message) => (
              <div key={message.id} className="message">
                {message}
              </div>
            ))}
        </div>
        <form onSubmit={handleFormSubmit} className="input-form">
          <input
            type="text"
            placeholder="Type your message"
            value={inputValue}
            onChange={handleInputChange}
            className="input-field"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Chats;
