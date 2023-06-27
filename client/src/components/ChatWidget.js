import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import NavBar from "./NavBar";
import Footer from "./Footer";


const ChatWidget = (props) => {
  const [showChat, setShowChat] = useState(false);
  // const [recipientId, setRecipientId] = useState(props.match.params.id);
  // console.log(props);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  // Load chats from the API endpoint
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    // Connect to Socket.IO server
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    socket.emit("setUserId", userId);
    console.log("-----------------------------", socket);
    socket.on("greeting-from-server", function (message) {
      console.log(message);
    });

    setSocket(socket);

    // Cleanup function to disconnect Socket.IO on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleToggleChat = () => {
    setShowChat(!showChat);

    fetch(`http://localhost:5000/api/message/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChats(data.data);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  };
  try {
    socket.on("message", function (message) {
      console.log(message);
    });
  } catch (err) {
    console.log(err);
  }

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    // Emit a new message event via Socket.IO
    socket.emit("newMessage", { recipientId: userId, text: message });

    // Add the sent message to the chat history
    setChats((prevChats) => [
      ...prevChats,
      { senderId: userId, text: message },
    ]);

    // Clear the message input
    setMessage("");
  };

  return (
    <div>
       {/* <NavBar /> */}
      {showChat ? (
        <div className="chat-widget">
          <div className="chat-header">
            <button className="close-button" onClick={handleToggleChat}>
              Close
            </button>
          </div>
          <div className="chat-messages">
            {chats.length &&
              chats.map((chat, index) => (
                <div key={index} className="chat-message">
                  <div className="sender">{chat.senderId}</div>
                  <div className="text">{chat.text}</div>
                </div>
              ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <div className="chat-icon">
          <button className="btn btn-primary" onClick={handleToggleChat}>
            Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
