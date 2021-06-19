// import express from 'express'
const express = require ('express')
const app = express()
const port = 3000
const scrapper = require ('./scrapper');


// import scrappers from './scrapper.js', had to remove "type": "module" from package.json
const db = require ('./db')

// turn inputs from web page body to json

app.use(express.json()); 

//we would previously install body-parser, const app bodyParser = require('body-parser), app.use(bodyParser.json()). 
//Now Express has its own version so since express is already imported, we just do: app.use(express.json());

app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");//disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

//this is a rout also called a controller, server controlling inputs from page & items from database
//the request being made is when a url is put into the browser, and our response is to send creators Array
app.get('/creators', async (req, res) => {
    
  const creators = await db.getAllCreators();
  res.send(creators)
  
  
  // const creators = [
  //       {name: 'Code Drip', img: 'https://'},
  //       {name: 'Dave Lee', img: 'https://'},
  //       {name: 'MKBHD', img: 'https://'}
  //   ];
    
  //   To Do Get from BD 
    
})

app.post('/creators', async (req, res) => {
    console.log(req.body)
    const channelData = await scrapper.scrapeChannel(req.body.channelURL)
    console.log({channelData});
    const creators = await db.insertCreator(channelData.name, channelData.avatarURL, req.body.channelURL)
    // todo: Scrape Channel
    // Todo: Add to DB
    res.send(creators)
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})