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
