const BASE = "https://branchsupportportal.onrender.com/api";

export const api = {
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
  }
};
