const express = require('express')
require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');


const app = express()
const port = process.env.APP_PORT || 3000;


const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

  
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })