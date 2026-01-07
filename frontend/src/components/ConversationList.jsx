export default function ConversationList({ conversations, selectedId, onSelect }) {
  if (!conversations.length) {
    return <div style={{ padding: 16 }}>No conversations</div>;
  }

  return conversations.map(c => (
    <div
      key={c.id}
      onClick={() => onSelect(c)}
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid #e5e7eb",
        cursor: "pointer",
        background: c.id === selectedId ? "#eef2ff" : "white"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{c.customer_name}</strong>

        {c.status === "open" && c.urgency >= 4 && (
          <span style={{ color: "#b91c1c", fontSize: 12 }}>Urgent</span>
        )}
      </div>

      <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
        {c.last_message}
      </div>

      <div style={{ fontSize: 11, marginTop: 4 }}>
        {c.assigned_agent
          ? `Assigned to ${c.assigned_agent}`
          : "Unassigned"}
      </div>
    </div>
  ));
}
