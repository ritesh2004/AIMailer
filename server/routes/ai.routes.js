const express= require("express");

const { writeWithAI } = require("../controllers/ai.controller.js");

const aiRouter = express.Router();

aiRouter.post("/write", writeWithAI);

module.exports = aiRouter;