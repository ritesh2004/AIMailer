const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const readline = require('readline');
// const open = require('open');
require('dotenv').config('./.env');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (req,res) => {
  try {
    const { from,to,subject,text,html } = req.body;
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: "rtshprmnk@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      },
    });

    const mailOptions = {
      from: from,
      to: to, 
      subject: subject,
      text: text,
      html: html,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({error:'Failed to send mail'});
      }
      console.log('Message sent: %s', info.messageId);
      return res.status(200).json({message:'Mail sent successfully'});
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:'Failed to send mail'});
  }
};

const getMessage = async (messageId) => {
  try {
    const gmail = google.gmail({ version: 'v1', oAuth2Client });
    const res = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
    });
    console.log(`Message ${messageId}:`, res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching message:', error);
  }
};

async function listMessages() {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  gmail.users.messages.list({
    userId: 'me',
    q: '', // optional query string for filtering emails
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const messages = res.data.messages;
    const msgs = [];
    if (messages.length) {
      console.log('Messages:');
      messages.forEach((message) => {
        console.log(`- ${message.id}`);
        msgs.push(getMessage(message.id));
      });
      return msgs;
    } else {
      console.log('No messages found.');
    }
  });
}

const generateURL = async (req,res) => {
    try{
        const authUrl = await oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://mail.google.com'],
            prompt: 'consent',
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        // await open(authUrl);
        return res.status(200).redirect(authUrl);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error:'Failed to generate URL'});
    }
}

const getNewTokens = async (req,res) => {
  try{
    const { code } = req.body;
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('tokens:', tokens);
    oAuth2Client.setCredentials({refresh_token: tokens.refresh_token});
    return res.status(200).json({message:'New tokens generated successfully'});
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({error:'Failed to generate new tokens'});
  }
}

module.exports = { sendMail, listMessages,getMessage,getNewTokens,generateURL };