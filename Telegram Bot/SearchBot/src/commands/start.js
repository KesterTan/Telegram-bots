const config = require('../../config');

module.exports = (bot) => {
    let startMessage = config.startMessage;
    
    bot.command(['start', 'help'], ctx => {
        ctx.reply(startMessage, {
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
        })
    })
}

