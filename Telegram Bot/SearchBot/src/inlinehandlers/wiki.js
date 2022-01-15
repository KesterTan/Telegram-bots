const axios = require('axios');

module.exports = (bot) => {
    // Wiki API
    // https://en.wikipedia.org/w/api.php?
    // action=opensearch&format=json&search=<query>&limit=50

    // Wiki inline query
    bot.inlineQuery(/w\s.+/, async ctx => {
        // Get the query
        let input = ctx.inlineQuery.query.split(' ');
        input.shift(); // Removing w or p
        let query = input.join(' ');

        let res = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&limit=50`);
        let data = res.data;

        let titles = data[1];
        let links = data[3];

        // Check for errors
        if (titles == undefined) {
            return;
        }
        let results = titles.map((item, index) => {
            return {
                type: `article`,
                id: String(index),
                title: item,
                input_message_content: {
                    message_text: `${item}\n${links[index]}`
                },
                description: links[index],
                // Forming inline button for sharing
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: `Share ${item}`, switch_inline_query: `w ${item}`}
                        ]
                    ]
                }
            }
        })
        ctx.answerInlineQuery(results);
    })
}