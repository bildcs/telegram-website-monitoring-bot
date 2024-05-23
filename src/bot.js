require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const {createDomain, findUserDomain, checkDomain,findUuidForDomain,deleteDomain} = require('./utils/crudOperations');
const bot = process.env.TELEGRAM_TOKEN && new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
const {domainListReq,domainSettingsReq} = require('./utils/mixFunction');


const start = () =>{
    if(!bot) throw new Error('Telegram bot token cannot be empty.')
    commandEvent();
}

const commandEvent = () =>{


bot.onText(/\/start/, function onLoveText(msg) {
    const chatId = msg.chat.id;
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          ['🔥Domain Add','📋Domain List'],
          ['⁉️Help']
        ]
      })
    };
   
    bot.sendMessage(chatId, `⚡️Telegram Monitoring Bot, Enter Site Link, Get Notified for Errors!`, opts);
  });


    bot.onText(/\/add (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const getAddDomain = match[1]

        findUserDomain(chatId, (err, data) => {
            if(err) return console.error(err);
            else{
                if(data.length >= process.env.ADD_DOMAIN_LIMIT) bot.sendMessage(chatId, 'Max Domain Limit Reached.');
                else{
                    checkDomain(getAddDomain, (err, data) => {
                        if(err) return console.error(err);
                        else{
                            if(data.length > 0){
                                bot.sendMessage(chatId, 'Domain is already added.');
                            }else{
                                createDomain(getAddDomain,chatId, (err, id) => {
                                    if(err) return console.error(err);
                                    else bot.sendMessage(chatId, 'Domain added successfully.');
                                })
                            }
            
                        }
                        
                    });
                }
                  
                } 
            }
        )



       
    });


    bot.onText('📋Domain List', (msg) => {
        const chatId = msg.chat.id;

        findUserDomain(chatId, (err, data) => {
            if(err) return console.error(err);
            else{
                if(data.length > 0){
                    const opts =  domainListReq(data)                   
                    bot.sendMessage(chatId, 'Select a domain', opts);
                }else{
                    bot.sendMessage(chatId, 'Added domain not found.');
                }
            }
        });

    });

  



        bot.on('callback_query', function onCallbackQuery(callbackQuery) {
          
            const splitData = (callbackQuery.data).split(':');
            const uuid = splitData[0];
            const action = splitData[1];
            const msg = callbackQuery.message;
            if(action ==='select'){
             
                findUuidForDomain(msg.chat.id,uuid,(err, data) => {
               
                    if(err) return console.error(err);
                    if(data.length === 0){
                     
                        bot.sendMessage(msg.chat.id, 'Domain not found');
                    }else{
                        const domain = data[0].domain;
                        const opts = domainSettingsReq(data[0]);
                        const sendData = {
                            chat_id: msg.chat.id,
                            message_id: msg.message_id
                        };
                      
                       bot.deleteMessage(msg.chat.id, msg.message_id)
                       bot.sendMessage(msg.chat.id, `Domain : ${domain}`, opts);
                    }
                })
            }else if(action === 'delete'){
                deleteDomain(msg.chat.id,uuid,(err) => {
                    if(err) return console.error(err);
                    const sendData = {
                        chat_id: msg.chat.id,
                        message_id: msg.message_id
                    };

                    
                  
                    bot.editMessageText('Domain deleted successfully.',sendData);
                });


            }


    
        });

    
}








module.exports = {start}






