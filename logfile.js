const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  const time = new Date().toLocaleString();
  const ip = req.ip || req.connection.remoteAddress;
  const method = req.method;
  const url = req.originalUrl;

  const logEntry = `[${time}] IP: ${ip} Method: ${method} URL: ${url}\n`;

  // Log to console
  console.log(logEntry);

  // Append to file
  fs.appendFile('change.log', logEntry, (err) => {
    if (err) console.error('Error writing to log file', err);
  });

  next(); // Continue to the next route
});

app.get('/', (req, res) => {
  res.send('Logging to file done!');
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
