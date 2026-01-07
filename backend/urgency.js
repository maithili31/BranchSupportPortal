export function scoreUrgency(text) {
  if (!text || typeof text !== "string") return 1;

  let normalized = text.toLowerCase();

  // remove punctuation
  normalized = normalized.replace(/[^\w\s]/g, " ");

  // collapse repeated spaces
  normalized = normalized.replace(/\s+/g, " ");

  const keywords = [
    "urgent",
    "asap",
    "cannot pay",
    "cant pay",
    "can’t pay",
    "fail transaction",
    "failed transaction",
    "transaction failed",
    "overdue",
    "due today",
    "penalty",
    "fine",
    "suspended",
    "blocked",
    "block",
    "disconnected",
    "late fee",
    "fraud",
    "scam"
  ];


  let score = 1;

  keywords.forEach(k => {
    if (normalized.includes(k)) score += 2;
  });

  return Math.min(score, 5);
}
