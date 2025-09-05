import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import './Chat.css';

const SERVER_URL = 'http://localhost:5000'; // Update with your backend URL

const ExpertChat = ({ user }) => {
  const { userId } = useParams(); // Farmer's ID
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [farmer, setFarmer] = useState(null);
  const socketRef = useRef();
  const messagesEndRef = useRef();

  // Scroll to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    // Join expert-farmer chat room
    socketRef.current.emit('joinRoom', { userId: user._id, otherId: userId });

    // Listen for incoming messages
    socketRef.current.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, user._id]);

  // Fetch chat history and farmer info
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const chatRoomId = [user._id, userId].sort().join('_');

        const resMessages = await axios.get(
          `${SERVER_URL}/api/chat/${chatRoomId}`,
          { headers: { 'x-user-id': user._id } }
        );
        setMessages(resMessages.data.messages);

        const resFarmer = await axios.get(`${SERVER_URL}/api/users/${userId}`);
        setFarmer(resFarmer.data.user);
      } catch (err) {
        console.error('Error fetching chat:', err);
      }
    };

    fetchChat();
  }, [user._id, userId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const chatRoomId = [user._id, userId].sort().join('_');

    const message = {
      senderId: user._id,
      senderModel: 'Expert',
      receiverId: userId,
      receiverModel: 'Farmer',
      content: input,
      chatRoomId,
    };

    // Emit message via socket
    socketRef.current.emit('sendMessage', message);

    // Optimistically add to UI
    setMessages((prev) => [...prev, { ...message, timestamp: new Date() }]);
    setInput('');

    try {
      // Save message to backend
      await axios.post(`${SERVER_URL}/api/chat/send`, message);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>Chat with {farmer ? farmer.name : 'Farmer'}</h2>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${
              msg.senderId === user._id ? 'sent' : 'received'
            }`}
          >
            <p>{msg.content}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ExpertChat;
