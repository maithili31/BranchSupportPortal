const urgentKeywords = [
  "loan",
  "disburse",
  "payment",
  "failed",
  "rejected",
  "delay"
];

function isUrgent(text = "") {
  if (typeof text !== "string") return false;
  const lower = text.toLowerCase();
  return urgentKeywords.some(word => lower.includes(word));
}

export default function MessageList({ messages = [], onSelect, selectedId }) {
  if (!messages.length) {
    return (
      <div style={{ padding: "16px", color: "#6b7280", fontSize: "14px" }}>
        No messages found
      </div>
    );
  }

  return (
    <>
      {messages.map(msg => {
        const urgent = isUrgent(msg.content);
        const replied = Boolean(msg.replied);

        return (
          <div
            key={msg.id}
            className={`message ${
              msg.id === selectedId ? "message-active" : ""
            }`}
            onClick={() => onSelect(msg)}
            style={{
              opacity: replied ? 0.6 : 1,
              cursor: "pointer"
            }}
          >
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>{msg.customer}</strong>

              <div style={{ display: "flex", gap: "6px" }}>
                {replied && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#065f46",
                      background: "#d1fae5",
                      padding: "2px 8px",
                      borderRadius: "12px"
                    }}
                  >
                    Replied
                  </span>
                )}

                {!replied && urgent && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#b91c1c",
                      background: "#fee2e2",
                      padding: "2px 8px",
                      borderRadius: "12px"
                    }}
                  >
                    Urgent
                  </span>
                )}
              </div>
            </div>

            <p style={{ marginTop: "4px", color: "#374151" }}>
              {(msg.content || "").slice(0, 90)}
              {msg.content?.length > 90 ? "..." : ""}
            </p>
          </div>
        );
      })}
    </>
  );
}
