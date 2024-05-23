const express = require('express')
require('dotenv').config()
const {start} = require('./src/bot')


const app = express()
const port = process.env.APP_PORT || 3000;



start();









  
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })