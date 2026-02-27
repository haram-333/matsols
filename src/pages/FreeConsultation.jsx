import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import "./FreeConsultation.css";

const FreeConsultation = () => {
    const navigate = useNavigate();
    const chatEndRef = useRef(null);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            sender: "bot", 
            text: "Hello! I'm your MATSOLS AI Advisor. I can help you with university matching, visa requirements, or general study abroad questions. How can I assist you today?" 
        }
    ]);

    const [sessionId] = useState(() => `sess_${Date.now()}`);

    useEffect(() => {
        // Scroll to bottom only when messages change to prevent "jumping" on typing state
        chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [messages]);

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        // Add User Message
        const userMsg = { id: Date.now(), sender: "user", text: text };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            // Get Real/Simulated Response from Backend
            const data = await apiService.getAIChatResponse(text, sessionId);
            const botMsg = { id: Date.now() + 1, sender: "bot", text: data.content || data.reply };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg = { id: Date.now() + 1, sender: "bot", text: "I'm having trouble connecting to the MATSOLS server. Please try again in a moment." };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Simple Rule-Based Response Logic (Placeholder for Real AI)
    const getBotResponse = (input) => {
        const lowerInput = input.toLowerCase();
        
        if (lowerInput.includes("university") || lowerInput.includes("college")) {
            return "We partner with over 100+ universities globally. Could you tell me your preferred destination (e.g., UK, USA, Canada) and your current GPA/grades?";
        }
        if (lowerInput.includes("visa")) {
            return "Visa requirements vary by country. For example, the UK requires a Tier 4 Student Visa. Are you looking for information on a specific country's visa process?";
        }
        if (lowerInput.includes("scholarship") || lowerInput.includes("cost") || lowerInput.includes("fee")) {
            return "We can definitely help with scholarships! Many of our partner universities offer merit-based aid. What is your intended major?";
        }
        if (lowerInput.includes("agent") || lowerInput.includes("human") || lowerInput.includes("contact")) {
            return "I can connect you with a senior counselor. Please provide your email or phone number, and someone from our team will reach out within 24 hours.";
        }
        return "That's a great question. To give you the most accurate advice, could you tell me a bit more about your academic background?";
    };

    return (
        <div className="consultation-page">
            <div className="consultation-bg">
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>
            </div>

            {/* Header */}
            <header className="consultation-header">
                <Link to="/" className="header-brand">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--primary-orange)"></path>
                        <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    MATSOLS AI Advisor
                </Link>
                <div className="header-controls">
                    <button 
                        className="btn-close" 
                        onClick={() => window.location.href = '/'} 
                        title="Close Chat"
                        style={{cursor: 'pointer'}}
                    >
                        <iconify-icon icon="ri:close-line" style={{fontSize: '24px'}}></iconify-icon>
                    </button>
                </div>
            </header>

            {/* Chat Area */}
            <div className="chat-container">
                <div className="chat-messages-area">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.sender}`}>
                            <div className="avatar">
                                <iconify-icon icon={msg.sender === 'bot' ? "ri:robot-2-line" : "ri:user-smile-line"}></iconify-icon>
                            </div>
                            <div className="bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="typing-indicator">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Quick Options (Only show if few messages) */}
                {messages.length < 3 && (
                    <div className="preset-options">
                        <button className="btn-option" onClick={() => handleSend("I want to study in the UK")}>Study in UK 🇬🇧</button>
                        <button className="btn-option" onClick={() => handleSend("Tell me about Scholarships")}>Scholarships 🎓</button>
                        <button className="btn-option" onClick={() => handleSend("Visa Requirements")}>Visa Help ✈️</button>
                    </div>
                )}

                {/* Input Area */}
                <div className="chat-input-area">
                    <div className="chat-input-wrapper">
                        <input 
                            className="chat-input"
                            placeholder="Type your question here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button 
                        className="btn-send" 
                        onClick={() => handleSend()} 
                        disabled={!input.trim()}
                    >
                        <iconify-icon icon="ri:send-plane-fill" style={{fontSize: '20px'}}></iconify-icon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FreeConsultation;
