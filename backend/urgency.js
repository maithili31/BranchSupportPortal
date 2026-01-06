export function scoreUrgency(text) {
  if (!text || typeof text !== "string") return 1;

  const keywords = ["loan", "approval", "disburse", "urgent", "asap", "delay"];
  let score = 1;

  keywords.forEach(k => {
    if (text.toLowerCase().includes(k)) score += 2;
  });

  return Math.min(score, 5);
}
