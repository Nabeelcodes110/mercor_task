import React from "react";
import "./GroupChat.css";

function GroupChat() {
  return (
    <div class="group-chat">
      <div class="group-details">
        <h2 class="group-name">Group Name</h2>
        <p class="group-description">Group Description</p>
        <button class="leave-button">Leave Group</button>
      </div>
      <div class="group-members">
        <h3 class="section-title">Group Members</h3>
        <ul class="member-list">
          <li class="member">Member 1</li>
          <li class="member">Member 2</li>
          <li class="member">Member 3</li>
        </ul>
      </div>
      <div class="chat-messages">
        <h3 class="section-title">Chat</h3>
        <ul class="message-list">
          <li class="message">Message 1</li>
          <li class="message">Message 2</li>
          <li class="message">Message 3</li>
        </ul>
      </div>
    </div>
  );
}

export default GroupChat;
