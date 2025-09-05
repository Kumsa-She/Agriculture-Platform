import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';

const socket = io('http://localhost:5000');

const Chat = () => {
  const { chatRoomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const expert = location.state?.expert || null;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/chat/${chatRoomId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (res.data.success) {
          setMessages(res.data.messages);
        }
      } catch (err) {
        console.error('Error fetching chat history:', err);
      }
    };

    fetchMessages();
  }, [chatRoomId]);

  useEffect(() => {
    if (!chatRoomId) return;

    socket.emit('joinRoom', chatRoomId);

    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.emit('leaveRoom', chatRoomId);
    };
  }, [chatRoomId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      chatRoomId,
      content: newMessage,
      senderId: user?._id,
      senderModel: user?.role === 'farmer' ? 'Farmer' : 'Expert',
      receiverId: expert?._id,
      receiverModel: expert ? 'Expert' : 'Farmer',
    };

    const tempMessage = { ...messageData, timestamp: new Date(), read: false };
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage('');

    try {
      await axios.post('http://localhost:5000/api/chat/send', messageData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      socket.emit('sendMessage', messageData);
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages((prev) => prev.filter((msg) => msg !== tempMessage));
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <button onClick={() => navigate(-1)}>&larr; Back</button>
        <h2>Chat with {expert ? expert.name : 'User'}</h2>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => {
          const isSender =
            msg.senderId === user?._id || msg.senderId === user?._id.toString();
          return (
            <div
              key={index}
              className={`chat-message ${isSender ? 'sent' : 'received'}`}
            >
              <p>{msg.content}</p>
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <textarea
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
