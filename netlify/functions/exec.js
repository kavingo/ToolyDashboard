import fetch from "node-fetch";

export async function handler(event){
  const api = "https://YOUR_VDS_PUBLIC_IP:9000/dash/exec"; // FastAPI port
  try{
    const r = await fetch(api, { method:"POST",
       headers:{ "Content-Type":"application/json" },
       body: event.body });
    const body = await r.text();
    return { statusCode:r.status, body };
  }catch(e){
    return { statusCode:500, body:"Error "+e };
  }
}
