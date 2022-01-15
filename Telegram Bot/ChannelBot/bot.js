// const Telegraf = require('telegraf');
// const bot = new Telegraf("1789692328:AAFOZG6uZ27_svnbmTtY_X7H3-CvE54doKw");

// bot.use(ctx => {
//     console.log(ctx.chat);
// })

// bot.launch();

const fetch = require('node-fetch');

let token = "1789692328:AAFOZG6uZ27_svnbmTtY_X7H3-CvE54doKw"; 
let data = {
  chat_id: "-1001438889935",
  text: "text message"
};

// Self invoking async function
(async () => {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`,
    {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json'}
    }) 
})();
