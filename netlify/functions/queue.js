const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const queueFile = path.join(__dirname, '../../queue.json');

    // Load current queue
    let queue = [];
    if (fs.existsSync(queueFile)) {
      queue = JSON.parse(fs.readFileSync(queueFile));
    }

    // Append new command
    queue.push({
      token: body.token,
      command: body.command,
      args: body.args || {},
      timestamp: Date.now()
    });

    fs.writeFileSync(queueFile, JSON.stringify(queue, null, 2));
    return { statusCode: 200, body: 'Queued' };
  } catch (err) {
    return { statusCode: 500, body: 'Error: ' + err.message };
  }
};
