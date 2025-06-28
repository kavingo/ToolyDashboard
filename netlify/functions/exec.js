export async function handler(event) {
  const body = JSON.parse(event.body || "{}");
  const token = body.token;
  const command = body.command;
  const args = body.args;

  const res = await fetch("http://127.0.0.1:6969/run-command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, command, args })
  });

  const json = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify(json)
  };
}
