const axios = require('axios');
const apikey = process.env.PIXABAYAPI;

module.exports = (bot) => {
// Pixabay search
// Regular expressions: \s = whitespace, 
    bot.inlineQuery(/p\s.+/, async ctx => {

        // Narrows down to the search termh
        let input = ctx.inlineQuery.query.split(' ');
        input.shift(); // remove p or w
        let query = input.join(' ');

        // Get HTTP request via pixabay API
        let res = await axios.get(`https://pixabay.com/api/?key=${apikey}&q=${query}`);
        
        // Array of image objects from pixabay
        let data = res.data.hits;
        // console.log(data);

        // How to answer inline queries? 
        // ctx.answerInlineQuery(results, [extra]);
        // or
        // bot.telegram.answerInlineQuery(inlineQueryId, results, [extra]);

        let results = data.map((item, index) => {
            return {
                type: 'photo',
                id: String(index),
                photo_url: item.webformatURL,
                thumb_url: item.previewURL,
                photo_width: 200,
                photo_height: 300,
                caption: `[Source](${item.webformatURL})`,
                parse_mode: 'Markdown'
            }
        })
        ctx.answerInlineQuery(results);
    })
}