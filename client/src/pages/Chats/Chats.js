import React, { useEffect, useState } from "react";
import "./Chats.css";
import { useLocation } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../utils/config";
import ReactScrollToBottom from "react-scroll-to-bottom";
import {
  doc,
  collection,
  query as queries,
  where,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const Chats = () => {
  const [currentUser] = useAuthState(auth);
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const userData = location.state?.user;
  const combinedID =
    currentUser.uid > userData.uid
      ? currentUser.uid + userData.uid
      : userData.uid + currentUser.uid;
  const query = queries(
    collection(firestore, "Direct Messages"),
    where("__name__", "==", combinedID)
  );
  const docRef = doc(firestore, "Direct Messages", combinedID);
  const [msgs] = useCollectionData(query);

  //if No conversations are there then create a document in database
  useEffect(() => {
    getDoc(docRef)
      .then((data) => {
        if (!data.exists()) {
          setDoc(doc(firestore, "Direct Messages", combinedID), {
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
  });

  //adding message
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      updateDoc(
        docRef,
        {
          messages: arrayUnion(
            JSON.stringify({
              sender: currentUser.uid,
              reciever: userData.uid,
              text: inputValue,
              timeStamp: new Date(),
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
        <ReactScrollToBottom className="messages-container">
          {msgs &&
            msgs[0].messages.map((message) => (
              <div
                key={JSON.parse(message).id}
                className="message"
                id={JSON.parse(message).sender === currentUser.uid ? "a" : "b"}
              >
                {JSON.parse(message).text}
                <p style={{ fontSize: 12, color: "rgb(154, 153, 153)" }}>
                  {JSON.parse(message).timeStamp.substr(0, 17)}
                </p>
              </div>
            ))}
        </ReactScrollToBottom>
        <form onSubmit={handleFormSubmit} className="input-form">
          <input
            type="text"
            placeholder="Type your message"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
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
