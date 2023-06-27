import axios from "axios";
import React ,{ useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUserId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUserId);
    console.log(friendId);
    const getUser = async () => {
      try {
        const response = await axios
      .get(
        "http://localhost:5000/user?id=" + friendId
      )
      .then((result) => {
        console.log(result.data);
        return result.data;
      });
        setUser(response);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUserId, conversation]);

  return (
    <div className="conversation">
      <span className="conversationName">{user? user.first_name: "N/A"}</span>
    </div>
  );
}
