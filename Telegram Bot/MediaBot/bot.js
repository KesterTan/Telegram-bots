const Telegraf = require('telegraf');
const bot = new Telegraf('1807740239:AAGc-nPNmaqKB8QTYYWtjPS7NER58i9XR0g');

bot.command('test', ctx => {
    // You can send photos via these methods
    // url
    bot.telegram.sendPhoto(ctx.chat.id, 'https://i.pinimg.com/originals/42/63/2f/42632f4d48030c4b04bdeb2bbe00e313.jpg');
    // file path
    bot.telegram.sendPhoto(ctx.chat.id, {source: "res/london.jpg"});
    // file id
    bot.telegram.sendPhoto(ctx.chat.id, "AgACAgUAAxkBAAMIYJplMbWRkz6DCRH4neMTLabN8R0AAkytMRuyS9lUJxkn-po2cKlCwnhzdAADAQADAgADeAADRosBAAEfBA");
})

bot.command(['start', 'help'], ctx => {
    let message = `
Help reference:
/newyork - get image of New York
/dubai - get gif of Dubai
/singapore - get location of Singapore
/cities - get photos of cities
/citieslist - get text file of cities
    `;
    ctx.reply(message, {
        reply_to_message_id: ctx.message.message_id
    });
})

bot.command('newyork', ctx => {
    // Send chat action, last 5 secs <
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/newyork.jpg"
    },
    {
        // This will allow the message that is sent to be sent as a reply
        reply_to_message_id: ctx.message.message_id
    });
})

bot.command('dubai', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_video" )
    bot.telegram.sendAnimation(ctx.chat.id, "https://media2.giphy.com/media/c0BdI069vyn5K/giphy.gif?cid=790b7611640372d3186cd2314995cb37839375a907f0a08e&rid=giphy.gif",
    {
        reply_to_message_id: ctx.message.message_id
    });
})

bot.command('cities', ctx => {
    let cities = ['res/dubai.jpg', 'res/singapore.jpg', 'res/london.jpg', 'res/newyork.jpg', 'res/singapore.jpg'];
    let result = cities.map(city => {
        return {
            type: 'photo',
            media: {
                source: city
            }
        }
    });
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo" );
    bot.telegram.sendMediaGroup(ctx.chat.id, result,
    {
        reply_to_message_id: ctx.message.message_id
    });
})

bot.command('citieslist', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_document");
    bot.telegram.sendDocument(ctx.chat.id, {
        source: "res/citieslist.txt"
    }, 
    {
        // Adding a thumbnail
        thumb: { source: "res/dubai.jpg" }
    },
    {
        reply_to_message_id: ctx.message.message_id
    });
})

bot.command('singapore', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "find_location");
    bot.telegram.sendLocation(ctx.chat.id, 1.3521, 103.8198,
        {
            reply_to_message_id: ctx.message.message_id
        });
})

bot.on('message', async ctx => {
    if (ctx.updateSubTypes[0] == 'document') {
        // console.log(ctx.message.document);
        try {
            let link = await bot.telegram.getFileLink(ctx.message.document.file_id);        
            ctx.reply("Your download link: " + link);
        } catch (err) {
            console.log(err);
            ctx.reply(err.description);
        }
    } else if (ctx.updateSubTypes[0] == 'photo'){
        // console.log(ctx.message.photo);
        try {
            let link = await bot.telegram.getFileLink(ctx.message.photo[0].file_id);        
            ctx.reply("Your download link: " + link);
        } catch (err) {
            console.log(err);
            ctx.reply(err.description);
        }
    }
})

bot.launch();
