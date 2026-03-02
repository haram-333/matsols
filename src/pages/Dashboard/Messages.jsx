import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../../services/api';
import './Dashboard.css';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchHistory = async () => {
            const history = await apiService.fetchChatHistory();
            setMessages(history);
            setLoading(false);
            scrollToBottom();
        };
        fetchHistory();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsgContent = inputValue;
        setInputValue('');

        // 1. Optimistic Update (Optional, but let's wait for backend to be safe or just show loading)
        // For now, let's just wait for the response to avoid duplicate logic

        try {
            const response = await apiService.getAIChatResponse(userMsgContent);
            // Refresh history or just append both
            const history = await apiService.fetchChatHistory();
            setMessages(history);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="messages-page fade-in">
            <div className="section-header">
                <p className="section-subtitle">Chat with your AI advisor and support team.</p>
            </div>

            <div className="messages-container">
                <div className="messages-sidebar">
                    <div className="chat-search">
                        <iconify-icon icon="ri:search-line"></iconify-icon>
                        <input type="text" placeholder="Search conversations..." />
                    </div>
                    <div className="contacts-list">
                        <div className="contact-item active">
                            <img src="https://ui-avatars.com/api/?name=AI+Advisor&background=ff863c&color=fff" alt="AI" className="contact-avatar" />
                            <div className="contact-info">
                                <div className="contact-name">AI Advisor</div>
                                <div className="contact-preview">Always here to help...</div>
                            </div>
                            <div className="contact-meta">
                                <div className="unread-badge"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chat-window">
                    <div className="chat-header">
                        <div className="active-contact">
                            <img src="https://ui-avatars.com/api/?name=AI+Advisor&background=ff863c&color=fff" alt="AI" className="header-avatar" />
                            <div>
                                <h4 className="header-contact-name">AI Advisor</h4>
                                <div className="header-status">Online</div>
                            </div>
                        </div>
                        <div className="chat-actions">
                            <button title="More"><iconify-icon icon="ri:more-2-fill"></iconify-icon></button>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {loading ? (
                            <div className="chat-loading">Loading chat history...</div>
                        ) : messages.length > 0 ? (
                            messages.map(msg => (
                                <div key={msg.id} className={`chat-bubble-container ${msg.role === 'user' ? 'user' : 'bot'}`}>
                                    <div className="chat-bubble">
                                        {msg.content}
                                        <span className="bubble-time">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-messages">Start a conversation with your advisor!</div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-area">
                        <button className="btn-attach"><iconify-icon icon="ri:attachment-2"></iconify-icon></button>
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className="btn-chat-send" onClick={handleSend}>
                            <iconify-icon icon="ri:send-plane-2-fill"></iconify-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
