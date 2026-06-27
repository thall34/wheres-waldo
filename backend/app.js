const path = require("node:path");
const express = require("express");
const prisma = require('./config/db');
const cors = require('cors');

const PORT = process.env.PORT || 3000

const appRouter = require('./routes/appRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv/config");

app.use('/api', appRouter);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  };

  console.log(`Where's Waldo App - listening on port ${PORT}`);
});