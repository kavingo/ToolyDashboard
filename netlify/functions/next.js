import { popJobs } from "./store.js";

export async function handler(event){
  const token = (event.queryStringParameters||{}).token;
  if(!token) return { statusCode:400, body:"no token" };

  const jobs = await popJobs(token);   // returns [] if empty
  return { statusCode:200, body: JSON.stringify({ jobs }) };
}
