const Telegraf = require('telegraf');
const bot = new Telegraf("1859414983:AAFhi4G-Ir6W5xmVM7_UTySRtQ1frqHuzMY");
const axios = require('axios');

const apiKey = "da7e06c8ae8f4b33195cc3eb563407a2fec03b02177d0102f279c7139744300a";

bot.command(`start`, ctx => {
    sendStartMessage(ctx);
})

// Function to get the list of crypto currencies for information
bot.action(`cryptoPrice`, (ctx) => {
    let priceMessage = `Get Price Information. Select one of the cryptocurrencies below`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, priceMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: `BTC`, callback_data: `price_BTC`},
                    {text: `ETH`, callback_data: `price_ETH`}
                ],
                [
                    {text: `BCH`, callback_data: `price_BCH`},
                    {text: `LTC`, callback_data: `price_LTC`}
                ], 
                [
                    {text: `Back to menu`, callback_data: `start`}
                ]
            ]
        }
    })
    ctx.answerCbQuery();
})

let priceActionList = [`price_BTC`, `price_ETH`, `price_BCH`, `price_LTC`];

// Action for price of indiv bitcoins
bot.action(priceActionList, async ctx => {
    // console.log(ctx.match);
    // let the symbol be the last three letters of the items in priceActionList array
    let cryptoSymbol = ctx.match.split('_')[1];
    // console.log(cryptoSymbol);
    try {
        let response = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSymbol}&tsyms=USD,EUR&api_key=${apiKey}`);
        let cryptoData = response.data.DISPLAY[cryptoSymbol].USD;
        // console.log(cryptoData);

        let message = `
 
Symbol: ${cryptoSymbol}
Price: ${cryptoData.PRICE}
Open: ${cryptoData.OPENDAY}
High: ${cryptoData.HIGHDAY}
Low: ${cryptoData.LOWDAY}
Supply: ${cryptoData.SUPPLY}
Market Cap: ${cryptoData.MKTCAP}
        `;
        ctx.deleteMessage();
        bot.telegram.sendChatAction(ctx.chat.id, `typing`);
        bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: `Back to price`, callback_data: `cryptoPrice`}
                    ]
                ]
            }
        });
        ctx.answerCbQuery();

    } catch (err) {
        console.log(err);
        ctx.reply(`Error encountered`);
    }
})

// Info command
bot.action(`info`, (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Information about bot", {
        reply_markup: {
            keyboard: [
                [
                    {text: `Credits`},
                    {text: `API`}
                ],
                [
                    {text: `Remove keyboard`}
                ],
                [
                    {text: `Back to menu`}
                ]
            ], 
            // Optimise and scale the size of the button
            resize_keyboard: true,
            // Allow the buttons to be only pressed once before the keyboard hides itself
            one_time_keyboard: true
        }
    })
    ctx.answerCbQuery();
})

bot.hears(`Back to menu`, ctx => {
    sendStartMessage(ctx);
})

// Removing the keyboard
bot.hears(`Remove keyboard`, ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `Keyboard removed`, {
        reply_markup: {
            remove_keyboard: true
        }
    })
})

bot.hears('Credits', ctx => {
    ctx.reply(`This bot was made by @kestertann`);
})

bot.hears(`API`, ctx => {
    ctx.reply(`This bot uses cryptocompare API`);
})

// Action for back to start menu
bot.action(`start`, (ctx) => {
    ctx.deleteMessage();
    sendStartMessage(ctx);
})

// Function to prevent the repeating of lines of code in action and command block
function sendStartMessage(ctx) {
    let startMessage = `Welcome, this bot gives you information about Crytocurrencies`;
    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [
                // Row 1
                [
                    // Row 1, Column 1
                    {text: `Crypto Prices`, callback_data: `cryptoPrice`}
                ],
                // Row 2
                [
                    // Row 2, Column 1
                    {text: "CoinMarketCap", url: "https://coinmarketcap.com/"}
                ],  
                [
                    {text: `Bot info`, callback_data: `info`}
                ]
            ]
        }
    });
}

bot.command('test', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `Main Menu`, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Click me', callback_data: `one`},
                    {text: `Two`, callback_data: `Two`}
                ],
                [
                    {text: `See Fruits List`, callback_data: `fruits`},
                    {text: `See Meats List`, callback_data: `meats`}
                ]
            ]
        }
    })
})
// Using the callback data
bot.action(`one`, ctx => {
    // Answer the query so that the loading icon will dissapear
    // Message in the answerCbQuery will popup in middle of screen
    ctx.answerCbQuery(`Hello World`);
    ctx.reply("You clicked the button");
})

bot.action(`fruits`, ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `List of fruits: \nApples\nOranges\nPears`, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: `Back to menu`, callback_data: `menu`}
                ]
            ]
        }
    })
    ctx.answerCbQuery();
})

bot.action(`menu`, ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `Main Menu`, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Click me', callback_data: `one`},
                    {text: `Two`, callback_data: `Two`}
                ],
                [
                    {text: `See Fruits List`, callback_data: `fruits`},
                    {text: `See Meats List`, callback_data: `meats`}
                ]
            ]
        }
    })
    ctx.answerCbQuery();
})


bot.launch();