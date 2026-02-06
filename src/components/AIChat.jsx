import { useState, useRef, useEffect } from 'react';
import './AIChat.css';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am your AI Concierge. How can I help you find your dream university today?' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Mock bot response
    setTimeout(() => {
      let botContent = "That's interesting! I'm analyzing university data for you now. Would you like to see elligibility requirements for that?";
      if (inputValue.toLowerCase().includes('hi') || inputValue.toLowerCase().includes('hello')) {
        botContent = "Hi there! I can help you browse universities in the UK, USA, Canada, and Australia. Which country interests you most?";
      } else if (inputValue.toLowerCase().includes('uk')) {
        botContent = "Excellent choice. The UK has top-tier institutions like Imperial College and Oxford. What course are you looking to study?";
      }
      
      setMessages(prev => [...prev, { role: 'bot', content: botContent }]);
    }, 1000);
  };

  return (
    <div className="ai-agent-wrapper">
      <div 
        className={`ai-chat-window ${isOpen ? 'open' : ''}`}
      >
        <div className="ai-chat-header">
          <div className="ai-avatar">
            <iconify-icon icon="ri:robot-3-fill"></iconify-icon>
          </div>
          <div className="ai-status-info">
            <h4>MATSOLS Concierge</h4>
            <div className="ai-status">
              <span className="status-dot"></span>
              Online & Ready
            </div>
          </div>
          <button 
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
            onClick={() => setIsOpen(false)}
          >
            <iconify-icon icon="ri:close-line" width="24"></iconify-icon>
          </button>
        </div>

        <div className="ai-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-input-wrapper">
          <input 
            type="text" 
            className="ai-input" 
            placeholder="Type your message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="ai-send-btn" onClick={handleSend}>
            <iconify-icon icon="ri:send-plane-2-fill"></iconify-icon>
          </button>
        </div>
      </div>

      <button className="ai-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {!isOpen && <div className="pulse"></div>}
        <iconify-icon 
          icon={isOpen ? "ri:close-fill" : "ri:robot-3-line"} 
          width="30"
        ></iconify-icon>
      </button>
    </div>
  );
};

export default AIChat;
