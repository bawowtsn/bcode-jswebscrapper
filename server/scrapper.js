//install puppeteer module as a dependency which will allow us to do scrapping

// import puppeteer from 'puppeteer'; 
const puppeteer = require('puppeteer'); //using ES6 instead of 

async function scrapeChannel(url) {

    //launch our browser with a puppeteer method launch
    const browser = await puppeteer.launch();
    //create a new page with lunch method newPage()
    const page = await browser.newPage();
    //use newPage method goto(), to say what new page url to launch
    await page.goto(url);

    //extract items  on a page by righ clicking it and using inspect, then copy, using copy xpath 


    //this [] is a destructuring syntax that will pull the first item from the array this function returns
    //use edge browser inspect to get the full xpath from elements
    const [el] = await page.$x('/html/body/ytd-app/div/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/div/div[1]/ytd-channel-name/div/div/yt-formatted-string');
    //extract text from url with getProperty method for tectContent
    const text = await el.getProperty('textContent');
    //turn result into a string
    const name = await text.jsonValue();

    const [el2] = await page.$x('//*[@id="img"]');
    //extract image source property from url with getProperty method for tectContent
    const src = await el2.getProperty('src');
    //turn result into a string
    const avatarURL = await src.jsonValue();

    browser.close();

console.log({name, avatarURL})

    //now return both properties as an object
    return (name, avatarURL)
}

module.exports = { 
    scrapeChannel 
}