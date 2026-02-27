import React, { useState } from 'react';
import './Dashboard.css';

const Messages = () => {
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', content: "Hello Haram! I'm your assigned consultant, Sarah. I've reviewed your Passport copy and it's perfect. Do you have your original transcripts ready?", time: "10:20 AM" },
        { id: 2, role: 'user', content: "Hi Sarah, yes I have them. Should I upload them as a single PDF or separate files?", time: "11:05 AM" },
        { id: 3, role: 'bot', content: "Single PDF is preferred. Also, make sure to include the back side if there are any official stamps.", time: "11:08 AM" }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const newMsg = {
            id: messages.length + 1,
            role: 'user',
            content: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMsg]);
        setInputValue('');
    };

    return (
        <div className="messages-page fade-in">
            <div className="section-header">
                <p className="section-subtitle">Chat with your consultants and support team.</p>
            </div>

            <div className="messages-container">
                <div className="messages-sidebar">
                    <div className="chat-search">
                        <iconify-icon icon="ri:search-line"></iconify-icon>
                        <input type="text" placeholder="Search conversations..." />
                    </div>
                    <div className="contacts-list">
                        <div className="contact-item active">
                            <img src="https://ui-avatars.com/api/?name=Sarah+Consultant&background=ff863c&color=fff" alt="Sarah" className="contact-avatar" />
                            <div className="contact-info">
                                <div className="contact-name">Sarah (Consultant)</div>
                                <div className="contact-preview">Single PDF is preferred...</div>
                            </div>
                            <div className="contact-meta">
                                <div className="contact-time">11:08</div>
                                <div className="unread-badge"></div>
                            </div>
                        </div>
                        <div className="contact-item">
                            <img src="https://ui-avatars.com/api/?name=Admin+Support&background=041021&color=fff" alt="Support" className="contact-avatar" />
                            <div className="contact-info">
                                <div className="contact-name">Support Team</div>
                                <div className="contact-preview">Your account is verified.</div>
                            </div>
                            <div className="contact-meta">
                                <div className="contact-time">Yesterday</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chat-window">
                    <div className="chat-header">
                        <div className="active-contact">
                            <img src="https://ui-avatars.com/api/?name=Sarah+Consultant&background=ff863c&color=fff" alt="Sarah" className="header-avatar" />
                            <div>
                                <h4 className="header-contact-name">Sarah</h4>
                                <div className="header-status">Online</div>
                            </div>
                        </div>
                        <div className="chat-actions">
                            <button title="Call"><iconify-icon icon="ri:phone-line"></iconify-icon></button>
                            <button title="Video"><iconify-icon icon="ri:video-chat-line"></iconify-icon></button>
                            <button title="More"><iconify-icon icon="ri:more-2-fill"></iconify-icon></button>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`chat-bubble-container ${msg.role}`}>
                                <div className="chat-bubble">
                                    {msg.content}
                                    <span className="bubble-time">{msg.time}</span>
                                </div>
                            </div>
                        ))}
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
