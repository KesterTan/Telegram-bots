const Telegraf = require('telegraf');
const bot = new Telegraf('1805061972:AAF2fDzYYLPMZ6iMaPw0Ny6xtWN_QznNf_E');

const axios = require('axios');

const fs = require('fs');

const helpMessage = `
*Simple API Bot*
/fortune - get a fortune cookie
/cat - get a random picture of a cat
/cat \`<text>\` - get a picture of a cat with <text>
/dogbreeds - get a list of dog breeds
/dog \`<breed>\` - get image of the dog breed
`;

bot.start((ctx, next) => {
    // ctx.reply(helpMessage);
    // Have to use this method to use markdown
    bot.telegram.sendMessage(ctx.from.id, helpMessage, {
        parse_mode: "markdown"
    });
    next(ctx);
})

bot.help(ctx => {
    // ctx.reply(helpMessage);
    bot.telegram.sendMessage(ctx.from.id, helpMessage, {
        parse_mode: "markdown"
    });
})

bot.command("fortune", (ctx) => {
    axios.get('http://yerkee.com/api/fortune')
        .then(response => {
            // console.log(response.data.fortune);
            ctx.reply(response.data.fortune);
        }) .catch(err => {
            console.log(err);
        })
})

bot.command("cat", async (ctx) => {
    // Get the input into an array
    let input = ctx.message.text;
    let inputArray = input.split(" ");

    // Alternative method using async and await
    // Need to manually input catch and try

    // Check if the argument is only one
    if (inputArray.length == 1){
        try {
            let res = await axios.get("https://aws.random.cat/meow");
            // console.log(res.data.file);
            ctx.replyWithPhoto(res.data.file);
        } catch (err) {
            console.log(err);
        }
    }
    // Alternative method using then and catch

    // axios.get("https://aws.random.cat/meow")
    //     .then(response => {
    //         // console.log(response.data.file);
    //         bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    //         bot.telegram.sendPhoto(ctx.chat.id, response.data.file, {
    //             reply_to_message_id: ctx.message.message_id
    //         });
    //     }) .catch(err => {
    //         console.log(err);
    //     })
    else {
        // Remove the first item of array
        inputArray.shift();
        let input = inputArray.join(" ");
        ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`);
    }
})

bot.command("dogbreeds", (ctx) => {
    // Read contents of JSON file
    let rawdata = fs.readFileSync("./dogbreeds.json", "utf8");
    // Convert data from JSON to JS
    let data = JSON.parse(rawdata);
    //console.log(data);

    // Add dog breeds into the message
    let message = "Dog breeds: \n";
    data.forEach(item => {
        message += `${item}\n`;
    });
    ctx.reply(message);
})

bot.command("dog", (ctx) => {
    // Split the input into an array
    let input = ctx.message.text.split(" ");

    // Error message
    if (input.length != 2) {
        ctx.reply("You must give a dog breed after /dog")
        return;
    } 
    let breedInput = input[1];
    
    // Read contents of JSON file
    let rawdata = fs.readFileSync("./dogbreeds.json", "utf8");
    // Convert data from JSON to JS
    let data = JSON.parse(rawdata);

    // If the data matches perfectly
    if (data.includes(breedInput)) {
        axios.get(`https://dog.ceo/api/breed/${breedInput}/images/random`)
            .then(response => {
                bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
                // console.log(response.data.message);
                bot.telegram.sendPhoto(ctx.chat.id, response.data.message, 
                    {
                        reply_to_message_id: ctx.message.message_id
                    });
            })
            .catch(err => {
                console.log(err);
            })
    // Filter through all the data if it does not match completely    
    } else {
        let suggestions = data.filter(item => {
            return item.startsWith(breedInput);
        })
        // Create a list of suggestions
        let message = "Did you mean: \n";
        suggestions.forEach(item => {
            message += `${item}\n`;
        })

        // If no suggestions
        if (suggestions.length == 0) {
            ctx.reply("Cannot find breed");
        } else {
            ctx.reply(message);
        }
    }
})

bot.launch();