export async function handler(event) {
  try {
    const { token, channel, embed } = JSON.parse(event.body);
    const r = await fetch(
      `https://discord.com/api/v9/channels/${channel}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bot ${token}`,
          "Content-Type":  "application/json"
        },
        body: JSON.stringify({ content: "", embeds: [embed] })
      }
    );
    if (r.ok)  return { statusCode: 200, body: "✅ Embed sent!" };
    return      { statusCode: r.status, body: `Discord API error ${r.status}` };
  } catch (e) {
    return { statusCode: 500, body: `Error: ${e}` };
  }
}
