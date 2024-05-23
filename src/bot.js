require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');

const bot = process.env.TELEGRAM_TOKEN && new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});



const start = () =>{
    if(!bot) throw new Error('Telegram bot token cannot be empty.')
    commandEvent();
}

const commandEvent = () =>{
    bot.onText(/\/add (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const getAddDomain = match[1]
        bot.sendMessage(chatId, getAddDomain);
    });

    bot.onText(/\/del (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const getDelDomain = match[1]
        bot.sendMessage(chatId, getDelDomain);
    });

    bot.onText('/list', (msg, match) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'list');
    });
}






module.exports = {start}






