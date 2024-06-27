const express = require('express');
const { getNewTokens, sendMail, listMessages, getMessage,generateURL } = require('../controllers/mail.controller.js');

const router = express.Router();

router.get('/getmails', async (req, res) => {
  try {
    const messages = await listMessages();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/authurl', generateURL); 

router.post('/auth', getNewTokens);

router.post('/sendmail', sendMail);

module.exports = router;