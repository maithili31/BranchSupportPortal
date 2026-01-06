import { useState, useEffect } from "react";
import { api } from "../api";
import CannedReplies from "./CannedReplies";

export default function MessageDetail({ message, refresh }) {
  const [reply, setReply] = useState("");
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    if (!message) return;

    setCustomerInfo({
      id: message.id,
      phone: "9XXXXXXXXX",
      loanStatus: "Active",
      loanAmount: "₹15,000",
      dueDate: "15 Jan 2026"
    });
  }, [message]);

  const sendReply = async () => {
    if (!reply.trim()) return;

    await api.sendReply(message.id, reply);
    message.response = reply;
    message.replied = 1;

    setReply("");
    refresh();
  };

  if (!message) {
    return (
      <div style={{ padding: "20px", color: "#6b7280" }}>
        Select a conversation to view details
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Customer Context */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
          background: "#f9fafb"
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: 600 }}>
          {message.customer}
        </div>

        <div
          style={{
            marginTop: "4px",
            fontSize: "12px",
            color: "#6b7280",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap"
          }}
        >
          <span>ID: {customerInfo?.id}</span>
          <span>Loan: {customerInfo?.loanStatus}</span>
          <span>Amount: {customerInfo?.loanAmount}</span>
          <span>Due: {customerInfo?.dueDate}</span>
        </div>
      </div>

      {/* Conversation Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "12px"
        }}
      >
        {/* Customer Message */}
        <div style={{ padding: "12px 16px" }}>
          <div
            style={{
              maxWidth: "85%",
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "12px 14px",
              fontSize: "14px",
              lineHeight: 1.5
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#6b7280",
                marginBottom: "4px"
              }}
            >
              Customer
            </div>
            {message.content}
          </div>
        </div>

        {/* Agent Reply */}
        {message.response && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0 16px 12px"
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                background: "#eef2ff",
                border: "1px solid #c7d2fe",
                borderRadius: "10px",
                padding: "12px 14px",
                fontSize: "14px"
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#4f46e5",
                  marginBottom: "4px",
                  textAlign: "right"
                }}
              >
                You
              </div>
              {message.response}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Reply */}
      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          background: "#ffffff"
        }}
      >
        <CannedReplies onSelect={setReply} />

        <div style={{ padding: "12px 16px" }}>
          <textarea
            placeholder="Type your reply…"
            value={reply}
            onChange={e => setReply(e.target.value)}
            disabled={message.replied}
            style={{
              width: "100%",
              minHeight: "72px",
              padding: "12px",
              fontSize: "14px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              resize: "none",
              outline: "none",
              background: message.replied ? "#f9fafb" : "#ffffff"
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "8px"
            }}
          >
            <button
              onClick={sendReply}
              disabled={message.replied}
              style={{
                background: message.replied ? "#a5b4fc" : "#4f46e5",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "8px 20px",
                fontSize: "14px",
                cursor: message.replied ? "not-allowed" : "pointer"
              }}
            >
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
