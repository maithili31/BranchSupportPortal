import { useEffect, useRef, useState } from "react";

export default function CannedReplies({ onSelect }) {
  const [canned, setCanned] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    fetch("http://localhost:5000/api/canned")
      .then(res => res.json())
      .then(data => {
        const unique = Array.isArray(data)
          ? Array.from(new Map(data.map(d => [d.id, d])).values())
          : [];
        setCanned(unique);
      })
      .catch(() => setCanned([]));
  }, []);

  useEffect(() => {
    setActiveId(null);
  }, [onSelect]);

  if (!canned.length) return null;

  return (
    <div
      style={{
        padding: "12px 20px", 
        background: "#ffffff",
        borderTop: "1px solid #e5e7eb"
      }}
    >
      <div
        style={{
          marginBottom: "10px", 
          fontSize: "11px",
          fontWeight: 600,
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: "0.04em"
        }}
      >
        Suggested replies
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px", 
          flexWrap: "wrap"
        }}
      >
        {canned.map(c => {
          const active = activeId === c.id;

          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveId(c.id);
                onSelect?.(c.text);
              }}
              style={{
                padding: "8px 18px",
                fontSize: "13px",
                borderRadius: "18px",
                border: "1px solid",
                borderColor: active ? "#6366f1" : "#e5e7eb",
                background: active ? "#eef2ff" : "#f9fafb",
                color: active ? "#3730a3" : "#374151",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
                boxShadow: active
                  ? "0 2px 6px rgba(99,102,241,0.25)"
                  : "none"
              }}
            >
              {c.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
