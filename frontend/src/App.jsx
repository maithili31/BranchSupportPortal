import { useEffect, useState } from "react";
import { api } from "./api";
import MessageList from "./components/MessageList";
import MessageDetail from "./components/MessageDetail";
import SearchBar from "./components/SearchBar";

const urgentKeywords = [
  "loan",
  "disburse",
  "disbursed",
  "payment",
  "paid",
  "failed",
  "rejected",
  "denied",
  "delay",
  "credited",
  "not credited"
];

function isUrgent(text = "") {
  const lower = text.toLowerCase();
  return urgentKeywords.some(word => lower.includes(word));
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadMessages = async () => {
    try {
      const data = await api.messages();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      setMessages([]);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const visibleMessages = messages.filter(m => {
    const text = (m?.content || "").toLowerCase();
    const customer = (m?.customer || "").toLowerCase();

    const matchesSearch =
      text.includes(search.toLowerCase()) ||
      customer.includes(search.toLowerCase());

    const matchesUrgency =
      filter === "urgent" ? isUrgent(m.content) : true;

    return matchesSearch && matchesUrgency;
  });

  return (
    <div className="layout">

      {/* LEFT PANEL */}
      <div className="sidebar">
        <SearchBar value={search} onChange={setSearch} />
        <div style={{ padding: "0 16px 12px" }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              marginRight: 8,
              background: filter === "all" ? "#2563eb" : "white",
              color: filter === "all" ? "white" : "#0f172a"
            }}
          >
            All
          </button>

          <button
            onClick={() => setFilter("urgent")}
            style={{
              background: filter === "urgent" ? "#ef4444" : "white",
              color: filter === "urgent" ? "white" : "#0f172a"
            }}
          >
            Urgent Only
          </button>
        </div>
        <MessageList
          messages={visibleMessages}
          selectedId={selected?.id}
          onSelect={setSelected}
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="detail-wrapper">
        {selected ? (
          <MessageDetail
            message={selected}
            refresh={loadMessages}
          />
        ) : (
          <div style={{ padding: "20px", color: "#6b7280" }}>
            Select a conversation to get started
          </div>
        )}
      </div>
    </div>
  );
}
