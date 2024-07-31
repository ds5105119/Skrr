"use client";

import React, { useState, useEffect } from "react";
import fetchAIHandler from "@/api/openai";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [currentTypingId, setCurrentTypingId] = useState(null);

    const handleSendMessage = async (message) => {
        const res = await fetchAIHandler([
            {
                role: "system",
                content: "assistant는 친절한 답변가이다.",
            },
            { role: "user", content: message },
        ]);
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, isUser: true },
            {
                text: `Your message is: "${JSON.stringify(res)}"`,
                isUser: false,
                isTyping: true,
                id: Date.now(),
            },
        ]);
    };

    const handleEndTyping = (id) => {
        setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === id ? { ...msg, isTyping: false } : msg)));
        setCurrentTypingId(null);
    };

    useEffect(() => {
        if (currentTypingId === null) {
            const nextTypingMessage = messages.find((msg) => !msg.isUser && msg.isTyping);
            if (nextTypingMessage) {
                setCurrentTypingId(nextTypingMessage.id);
            }
        }
    }, [messages, currentTypingId]);

    return (
        <div className="app">
            <div className="chat-box">
                <h1>Chat App</h1>
                <MessageList messages={messages} currentTypingId={currentTypingId} onEndTyping={handleEndTyping} />
                <MessageForm onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

const MessageList = ({ messages, currentTypingId, onEndTyping }) => (
    <div className="messages-list">
        {messages.map((message, index) => (
            <Message key={index} {...message} onEndTyping={onEndTyping} currentTypingId={currentTypingId} />
        ))}
    </div>
);

const Message = ({ text, isUser, isTyping, id, onEndTyping, currentTypingId }) => {
    return (
        <div className={isUser ? "user-message" : "ai-message"}>
            {isTyping && currentTypingId === id ? (
                <p>
                    <b>AI</b>: {text}
                </p>
            ) : (
                <p>
                    <b>{isUser ? "User" : "AI"}</b>: {text}
                </p>
            )}
        </div>
    );
};

const MessageForm = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSendMessage(message);
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className="message-form">
            <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} className="message-input" />
            <button type="submit" className="send-button">
                Send
            </button>
        </form>
    );
};

export default App;
