const Telegraf = require('telegraf');
const bot =  new Telegraf('1559880270:AAFZ80PNdkVZ7LzHSueiALfuQNcmoj5B3vY');

const helpMessage = `
Say something to me
/start - start the bot
/help - command reference
`;

bot.use((ctx, next) => {
    // console.log(ctx.message.from.first_name + " said: " + ctx.message.text);
    // console.log(ctx.chat);
    if (ctx.updateSubTypes[0] == "text") {
        bot.telegram.sendMessage(-576903767, ctx.from.first_name + " said: " + ctx.message.text);
    } else {
        bot.telegram.sendMessage(-576903767, ctx.from.first_name + " sent " + ctx.updateSubTypes[0]);
    }
    next();
})

bot.start((ctx) => {
    // logger(ctx);
    ctx.reply("This is echo bot");
    ctx.reply(helpMessage);
})

bot.help((ctx) => {
    // logger(ctx);
    ctx.reply(helpMessage);
})

bot.command("echo", (ctx) => {
    // logger(ctx);
    let input = ctx.message.text;
    // split into an array
    let inputArray = input.split(" ");
    // console.log(inputArray);

    let message = "";

    if (inputArray.length == 1) {
        message = "You typed echo";
    } else {
        inputArray.shift();
        message = inputArray.join(' ');
    }
    ctx.reply(message);
})

//function logger(ctx) {
    // console.log(ctx.message.from.first_name + " said " + ctx.message.text);
    // console.log(ctx.message.from);}

bot.launch();