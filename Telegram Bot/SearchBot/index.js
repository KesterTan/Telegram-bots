require('dotenv').config();
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.TOKEN);

// Pixabay API template: https://pixabay.com/api/?key=<apikey>&q=<search>

const startCommand = require('./src/commands/start');
startCommand(bot);

const imageHandler = require('./src/inlinehandlers/image');
imageHandler(bot);

const wikiHandler = require('./src/inlinehandlers/wiki');
wikiHandler(bot);

const startHandler = require('./src/inlinehandlers/start')
startHandler(bot);

// This uses polling - which is more inefficient
// bot.launch();

// Web hooking more efficient
exports.handler = (event, context, callback) => {
    const tmp = JSON.parse(event.body); // get data passed to us
    bot.handleUpdate(tmp); // make Telegraf process that data
    return callback(null, { // return something for webhook, so it doesn't try to send same stuff again
      statusCode: 200,
      body: '',
    });
  };