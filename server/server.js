const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const readline = require('readline');
require('dotenv').config('./.env');
const run = require('./controllers/ai.controller.js');
const router = require('./routes/mail.routes.js');
const aiRouter = require('./routes/ai.routes.js');
const cors = require('cors');

const app = express();  

app.use(cors(
  {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }

));

app.use(express.json());

app.use('/mail', router);
app.use('/ai', aiRouter);


app.listen(4000, () => {
  console.log('Server is running on port 4000');
});