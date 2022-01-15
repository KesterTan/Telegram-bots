require('dotenv').config();
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.TOKEN);

 const axios = require("axios");


bot.launch();