const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();
const PORT = 4000;

const changeLogStream = fs.createWriteStream(
  path.join(__dirname, 'change.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: changeLogStream }));

app.get('/', (req, res) => {
  res.send(' Morgan is logging to change.log file!');
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});