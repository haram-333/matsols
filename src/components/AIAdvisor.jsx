import { useState, useRef, useEffect } from "react";
import "./AIAdvisor.css";

const steps = [
  { field: "name", question: "Hello! I'm your AI Admissions Advisor. What's your full name?", placeholder: "e.g. John Doe" },
  { field: "email", question: "Nice to meet you! What's your email or phone number?", placeholder: "name@example.com" },
  { field: "destination", question: "Which country are you interested in studying in?", placeholder: "UK, USA, Canada, etc." },
  { field: "studyLevel", question: "What level of study are you looking for?", placeholder: "Undergraduate, Masters, etc." },
  { field: "budget", question: "What is your estimated annual budget?", placeholder: "e.g. $20,000 - $30,000" },
  { field: "timeline", question: "Which intake are you planning for?", placeholder: "Sept 2026, Jan 2027, etc." },
  { field: "background", question: "Briefly describe your academic background.", placeholder: "Degree, GPA, etc." }
];

const AIAdvisor = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([
    { type: "bot", text: steps[0].question }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { type: "user", text: inputValue };
    const nextStep = currentStep + 1;
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      if (nextStep < steps.length) {
        setMessages(prev => [...prev, { type: "bot", text: steps[nextStep].question }]);
        setCurrentStep(nextStep);
      } else {
        setMessages(prev => [...prev, { type: "bot", text: "Thank you! I've captured your details. Our advisors will contact you shortly. You can also register for a full portal account now." }]);
        setIsFinished(true);
      }
    }, 600);
  };

  return (
    <div className="simple-chat-box interactive">
      <div className="chat-header">
        <span className="dot"></span> Online Assistant
      </div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      
      {!isFinished ? (
        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder={steps[currentStep].placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="btn-send">
            <iconify-icon icon="ri:send-plane-2-line"></iconify-icon>
          </button>
        </form>
      ) : (
        <div className="chat-completion-actions">
            <button className="btn-portal-reg" onClick={() => window.location.href='/register'}>Register for Portal</button>
        </div>
      )}
    </div>
  );
};

export default AIAdvisor;
