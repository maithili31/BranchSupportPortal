const BASE = "http://localhost:5000/api";

export const api = {
  /* ---------- Phase 0 (kept for safety / backward compatibility) ---------- */

  messages: async () => {
    const res = await fetch(`${BASE}/messages`);
    return res.json();
  },

  sendReply: async (id, response) => {
    await fetch(`${BASE}/messages/${id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response })
    });
  },

  /* ---------------------- Phase 2 (Conversation-based) ---------------------- */

  // Agent inbox
  getConversations: async () => {
    const res = await fetch(`${BASE}/conversations`);
    return res.json();
  },

  // Full chat history
  getConversationMessages: async (conversationId) => {
    const res = await fetch(
      `${BASE}/conversations/${conversationId}/messages`
    );
    return res.json();
  },

  // Agent reply
  replyToConversation: async (conversationId, message, agent) => {
    await fetch(`${BASE}/conversations/${conversationId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, agent })
    });
  },

  // Assign conversation to agent
  assignConversation: async (conversationId, agent) => {
    await fetch(`${BASE}/conversations/${conversationId}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agent })
    });
  }
};
