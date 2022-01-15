const config = require('../../config');

module.exports = (bot) => {
    let startMessage = config.startMessage;

    // Allow for start and help message to be available in every chat
    bot.inlineQuery(['start', 'help'], ctx => {
        let results = [
                {
                type: 'article',
                id: '1',
                title: 'Help reference',
                input_message_content: {
                    message_text: `${startMessage}`
                },
                description: 'Sends help message on how to use bot',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: 'Search pixabay image', switch_inline_query_current_chat: 'p '}
                        ],
                        [
                            {text: 'Search Wiki', switch_inline_query_current_chat: 'w ' }
                        ]
                    ]
                }
            }
        ]
        ctx.answerInlineQuery(results);
    })
}