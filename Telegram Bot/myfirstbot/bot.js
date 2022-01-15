const Telegraf = require('telegraf');

const bot = new Telegraf('1718914861:AAHlo3uxj06tVXrF2CHvaUeMuNRUoQ4aJyM');


bot.help((ctx) => {
    ctx.reply("You have entered the help command");
})

bot.settings((ctx) => {
    ctx.reply("You have entered the settings command");
})

// Creating your own command
// Putting commands in array can cope with caseensitivity
bot.command(["test", "Test", "test1"], (ctx) => {
    
    //Telegraf ctx shortcut   
    ctx.reply("Hello world",
    // Optional additional parameters
    {
        parse_mode: "Markdown",
        disable_notification: true
    }); 

    // Telegram method without shortcut
    bot.telegram.sendMessage(ctx.chat.id, "Hello world",
    // Optional additional parameters
    {
        parse_mode: "Markdown",
        disable_notification: true
    });
})

// Only specific message
// If added to another message it would fail
bot.hears("cat", (ctx) => {
    ctx.reply("meow");
})

// Reply immediatly when something happens
//bot.on("text", (ctx) => {
    //ctx.reply("This is a text message");
//})

// Reply when username @ something is mentioned
bot.mention("botfather", (ctx) => {
    ctx.reply("Mention method");
})

// Handles phone numbers
bot.phone("+65 96200632", (ctx) => {
    ctx.reply("Phone method");
})

// Handles hashtags
bot.hashtag("instagram", (ctx) => {
    ctx.reply("Hashtag method");
})

// Whatever is sent to the bot, the bot will respond with this
// The next function allows for the message to trigger to replies and pass tbrough two middlewares
bot.use((ctx, next) => {
    // State allows you to transfer data from one middlewear to the next
    // Store the data in state
    ctx.state.apple = 5;
    console.log(ctx);
    ctx.reply("Bot is used");
    next(ctx);
})

bot.start((ctx) => {
    ctx.reply(ctx.from.first_name + " has entered the start command and it is a " +
    ctx.updateSubTypes[0]);
    // console.log(ctx.from);
    //console.log(ctx.chat);
    // console.log(ctx.message);
    //console.log(ctx.updateSubTypes);
    ctx.reply(ctx.state.apple);
})

// method to start the script
bot.launch();