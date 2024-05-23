require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const {createDomain, findUserDomain, checkDomain} = require('./utils/crudOperations');
const bot = process.env.TELEGRAM_TOKEN && new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});



const start = () =>{
    if(!bot) throw new Error('Telegram bot token cannot be empty.')
    commandEvent();
}

const commandEvent = () =>{
    bot.onText(/\/add (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const getAddDomain = match[1]


        checkDomain(getAddDomain, (err, data) => {
            if(err) console.error(err);
            else{
                if(data.length > 0){
                    bot.sendMessage(chatId, 'Domain is already added.');
                }else{
                    createDomain(getAddDomain,chatId, (err, id) => {
                        if(err) console.error(err);
                        else bot.sendMessage(chatId, 'Domain added successfully.');
                    })
                }

            }
            
        });
    });

    bot.onText(/\/del (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const getDelDomain = match[1]
        bot.sendMessage(chatId, getDelDomain);
    });

    bot.onText('/list', (msg) => {
        const chatId = msg.chat.id;

        findUserDomain(chatId, (err, data) => {
            if(err) console.error(err);
           
            else{
                if(data.length > 0){
                    bot.sendMessage(chatId, data);
                }else{
                    bot.sendMessage(chatId, 'Added domain not found.');
                }
            }
        });

    });

    
}






module.exports = {start}






