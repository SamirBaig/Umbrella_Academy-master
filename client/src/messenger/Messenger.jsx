import "./messenger.css";
import Conversation from "../components/conversations/Conversation";
import Message from "../components/message/Message";
import React ,{ useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Messenger() {
  const location = useLocation();
  let currChat = null
  try{
    const { chat} = location.state;
    currChat = chat;
  }catch(err){
    currChat = null
  }
  
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(currChat);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const userId = localStorage.getItem("userid");
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if(arrivalMessage &&
      currentChat.members.includes(arrivalMessage.sender) ){
      setMessages((prev) => [...prev, arrivalMessage]);}
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
  }, [userId]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        console.log(userId)
        const res = await axios.get(`http://localhost:5000/api/chat/` + userId);
        console.log(res)
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      if(currentChat){
        console.log(currentChat)
        try {
          const res = await axios.get("http://localhost:5000/api/message/" + currentChat._id);
          console.log(res)
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      chatId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member != userId
    );

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/message/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {if (scrollRef.current) {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });}
  }, [messages]);

  return (
    <>
       <NavBar />

      <div className="messenger">
        
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUserId={userId} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === userId} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
}
