import { appendJob } from "./store.js";   // thin wrapper around your DB

export async function handler(event){
  const { token, command, args } = JSON.parse(event.body || "{}");
  if(!token || !command) return { statusCode:400, body:"Bad request" };

  await appendJob(token, { command, args, ts:Date.now() });
  return { statusCode:200, body:"queued" };
}
