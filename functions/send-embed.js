export async function handler(event) {
  try {
    const { token, channel, embed } = JSON.parse(event.body || "{}");

    if (!token || !channel || !embed)
      return { statusCode: 400, body: "Missing token, channel or embed" };

    // If color is a hex string, convert to integer
    if (typeof embed.color === "string") {
      embed.color = parseInt(embed.color.replace(/^0x/i, ""), 16) || 0;
    }

    // Clean out undefined or empty string keys
    const trim = (obj) =>
      Object.fromEntries(
        Object.entries(obj)
          .filter(([_, v]) => v !== undefined && v !== "")
          .map(([k, v]) => [k, v && typeof v === "object" ? trim(v) : v])
      );

    const cleaned = trim(embed);

    // Send the embed to Discord
    const r = await fetch(
      `https://discord.com/api/v9/channels/${channel}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "", embeds: [cleaned] }),
      }
    );

    const text = await r.text();
    if (r.ok) return { statusCode: 200, body: "✅ Embed sent!" };
    return { statusCode: r.status, body: `Discord API error ${r.status}: ${text}` };
  } catch (e) {
    return { statusCode: 500, body: `Error: ${e}` };
  }
}
