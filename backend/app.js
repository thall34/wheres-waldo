const path = require("node:path");
const express = require("express");
const prisma = require('./config/db');

const PORT = process.env.PORT || 3000

const app = express();
app.use(express.urlencoded({ extended: true }));

require("dotenv/config");

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/{*splat}', (req, res) => {
  res.status(404).render('errors', {
    title: 'Error 404 - Page Not Found',
    message: 'Error 404 - Page does not exist in the database',
  });
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  };

  console.log(`Where's Waldo App - listening on port ${PORT}`);
});