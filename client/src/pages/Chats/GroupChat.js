import React, { useEffect, useState } from "react";
import "./GroupChat.css";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, firestore } from "../../utils/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ReactScrollToBottom from "react-scroll-to-bottom";
import {
  collection,
  query as queries,
  updateDoc,
  where,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const GroupChat = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [currentUser] = useAuthState(auth);
  const [inputValue, setInputValue] = useState("");
  const groupData = location.state?.group;
  const query = queries(
    collection(firestore, "Groups"),
    where("groupID", "==", groupData.groupID),
    where("groupName", "==", groupData.groupName)
  );
  const [group] = useCollectionData(query);

  const docRef = doc(firestore, "Groups", groupData.groupName);

  //onLoad Add the user into the group
  useEffect(() => {
    updateDoc(docRef, {
      members: arrayUnion(
        JSON.stringify({
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
          displaName: currentUser.displayName,
        })
      ),
    });
  });

  //sending Message
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      updateDoc(
        docRef,
        {
          conversations: arrayUnion(
            JSON.stringify({
              sender: currentUser.uid,
              senderName: currentUser.displayName,
              text: inputValue,
              timeStamp: new Date(),
              textID: Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(10, "0"),
            })
          ),
        },
        { merge: true }
      );
      setInputValue("");
    }
  };

  //leaving Group
  const handleLeave = () => {
    updateDoc(
      docRef,
      {
        conversations: arrayUnion(
          JSON.stringify({
            sender: currentUser.uid,
            senderName: "ADMIN ",
            text: `${currentUser.displayName} Left the group`,
            timeStamp: new Date(),
            textID: Math.floor(Math.random() * 0xffffff)
              .toString(16)
              .padEnd(10, "0"),
          })
        ),
      },
      { merge: true }
    );
    updateDoc(docRef, {
      members: arrayRemove(
        JSON.stringify({
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
          displaName: currentUser.displayName,
        })
      ),
    });
    Navigate("/groups");
  };

  return (
    <div className="group-chat-container">
      <div className="sidebar">
        <div className="group-details">
          <h2>{groupData.groupName}</h2>
          <p>{groupData.description}</p>
        </div>
        <div className="members-list">
          <h3>Members</h3>
          <ul>
            {group &&
              group[0]?.members?.map((member) => (
                <li key={JSON.parse(member).uid}>
                  <span>
                    <img
                      src={JSON.parse(member).photoURL}
                      style={{ height: 30 }}
                      alt="profile"
                    />
                  </span>
                  <span>{JSON.parse(member).displaName}</span>
                </li>
              ))}
          </ul>
        </div>
        <button onClick={handleLeave}>Leave</button>
      </div>
      <div className="chatbox">
        <ReactScrollToBottom className="message-list">
          {group &&
            group[0]?.conversations?.map((message) => (
              <div
                className="message"
                id={JSON.parse(message).sender === currentUser.uid ? "a" : "b"}
                key={JSON.parse(message).textID}
              >
                <div className="sender">
                  {JSON.parse(message).sender === currentUser.uid
                    ? "You"
                    : JSON.parse(message).senderName}{" "}
                  :{" "}
                </div>
                <div className="content">{JSON.parse(message).text}</div>
              </div>
            ))}
        </ReactScrollToBottom>
        <form className="message-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;
