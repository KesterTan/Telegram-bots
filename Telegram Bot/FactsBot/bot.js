const Telegraf = require('telegraf');
const bot = new Telegraf("1775112844:AAHDOkwfvOs-UQ_sXRc33e82tAyYTLV4RCw");

// Allow you to send http requests
const axios = require('axios');

let dataStore = [];

bot.command('fact', (ctx) => {
    // Filter via row and column
    let maxRow = dataStore.filter(item => {
        return (item.row == '1' && item.col == '2');
    })[0].value;
    // console.log(maxRow);

    let random = Math.floor(Math.random() * maxRow) + 1;
    // console.log(random);

    let fact = dataStore.filter(item => {
        return(item.row == random && item.col == '5');
    })[0].value;
    // console.log(fact);

    let message = `
Fact #${random}:
${fact}
    `;

    ctx.reply(message, {
        //reply_to_message_id: ctx.message.message_id
    });
})

bot.command('update', async ctx => {
    try {
        await obtainData();
        ctx.reply(`Updated`);
    } catch (err) {
        console.log(err);
        ctx.reply("Error encountered");
    }
})

obtainData();
// Async and await method
async function obtainData(){
    try{
        let res = await axios('https://spreadsheets.google.com/feeds/cells/1y7nXYOElIDQWdxNXdZyHSB6Xjih31s0Q4OhSGDfA450/1/public/full?alt=json');
        // console.log(res.data.feed.entry);
        let data = res.data.feed.entry;

        // Make sure that data store is empty
        dataStore = [];
        // Copy data over to data store from data
        data.forEach(item =>  {
            // Push data into array using push()
            dataStore.push({
                row: item.gs$cell.row,
                col: item.gs$cell.col,
                inputFormula: item.gs$cell.inputValue,
                value: item.gs$cell.$t
            })
        })
        // console.log(dataStore);
    } catch (error) {
        console.log(error);
        // Raise the error
        throw new Error;
    }
}
// function obtainData(){
//     axios.get('https://spreadsheets.google.com/feeds/cells/1y7nXYOElIDQWdxNXdZyHSB6Xjih31s0Q4OhSGDfA450/1/public/full?alt=json')
//         .then(response => {
//             console.log(response.data.feed.entry);  
//         })
//         . catch (error => {
//             console.log(error);
//         })
// }

bot.launch();