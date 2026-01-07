import { useEffect, useState } from "react";
import { api } from "../api";

export default function ConversationDetail({ conversation }) {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  useEffect(() => {
    if (!conversation) return;
    api.getConversationMessages(conversation.id).then(setMessages);
  }, [conversation]);

  useEffect(() => {
    const handler = (e) => {
        if (e.ctrlKey && e.key === "Enter") {
        sendReply();
        }
        if (e.key === "Escape") {
        setReply("");
        }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    }, [reply]);


  const sendReply = async () => {
    if (!reply.trim()) return;

    await api.replyToConversation(
      conversation.id,
      reply,
      "agent@branch.com"
    );

    setMessages(prev => [
      ...prev,
      { sender: "agent", content: reply }
    ]);

    setReply("");
  };

  if (!conversation) {
    return <div style={{ padding: 20 }}>Select a conversation</div>;
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                m.sender === "agent" ? "flex-end" : "flex-start",
              marginBottom: 8
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px 12px",
                borderRadius: 10,
                background:
                  m.sender === "agent" ? "#eef2ff" : "#f8fafc"
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #e5e7eb", padding: 12 }}>
        <textarea
          value={reply}
          onChange={e => setReply(e.target.value)}
          placeholder="Type your reply..."
          style={{ width: "100%", minHeight: 60 }}
        />

        <button onClick={sendReply} style={{ marginTop: 8 }}>
          Send
        </button>
      </div>
    </div>
  );
}
