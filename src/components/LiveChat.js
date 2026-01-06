import React, { useState } from 'react';
import './LiveChat.css';

function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Xin chào! 👋 Chúng tôi có thể giúp gì cho bạn?',
      sender: 'bot',
      timestamp: new Date(Date.now() - 5000)
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const botResponses = [
    'Cảm ơn bạn đã liên hệ! 😊',
    'Tôi đang kiểm tra thông tin cho bạn...',
    'Bạn cần hỗ trợ gì thêm không?',
    'Rất vui được giúp bạn! 💪',
    'Bạn vui lòng chờ một chút, tôi đang xử lý...',
    'Hiểu rồi, để tôi tìm hiểu kỹ hơn nhé',
    'Có gì khác tôi có thể giúp không?',
    'Cảm ơn bạn đã tin tưởng chúng tôi! ⭐'
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: 'Xin chào! 👋 Chúng tôi có thể giúp gì cho bạn?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="livechat-container">
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-content">
              <h3>Trợ Lý Trực Tuyến</h3>
              <span className="status-indicator"></span>
              <span className="status-text">Trực tuyến</span>
            </div>
            <div className="chat-header-actions">
              <button 
                className="clear-btn" 
                onClick={handleClearChat}
                title="Xóa tin nhắn"
              >
                🔄
              </button>
              <button 
                className="close-btn" 
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="chat-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="chat-input"
            />
            <button type="submit" className="send-btn">
              ➤
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button 
        className={`floating-chat-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Đóng chat' : 'Mở chat'}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}

export default LiveChat;
