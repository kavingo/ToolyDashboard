import fs from "fs/promises";

export async function handler(event) {
  const { command, args } = JSON.parse(event.body || "{}");

  // quick validation
  if (!command) return { statusCode: 400, body: "no command" };

  const file = "queue.json";
  let q = [];
  try { q = JSON.parse(await fs.readFile(file)); } catch {}
  q.push({ command, args, timestamp: Date.now() });
  await fs.writeFile(file, JSON.stringify(q, null, 2));
  return { statusCode: 200, body: "queued" };
}
