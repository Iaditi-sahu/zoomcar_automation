const puppeteer = require("puppeteer");
const nodemailer = require('nodemailer');
const mailFunction = require("./mailSender.js");
let isAva;

(async function () {
  try {
    let browserPromise = puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    let newTab = await (await browserPromise).newPage();
    await newTab.goto(
      "https://www.zoomcar.com/pune/"
    );
    await newTab.click("[title = 'Start your wonderful journey']");
    await waitAndClick(".search-input", newTab);
    await newTab.waitForSelector(".terminal", {visible: true});
    await newTab.click(".terminal");
    await waitAndClick(".component-modal", newTab);
    await newTab.waitForSelector(".gotIt", {visible: true});
    await newTab.click(".gotIt");
    await newTab.click(".proceed");
    await waitAndClick(".search-input", newTab);
    await newTab.waitForSelector("button.proceed", {visible: true});
    await newTab.click("button.proceed");
    await waitAndClick(".search-input", newTab);
    await newTab.waitForSelector("button.proceed", {visible: true});
    await newTab.click("button.proceed");
    await waitAndClick(".search-result-container", newTab);
    let result = await checkIfCarAvailable(newTab, runOnConsole, ".car-listing");
    if(result != null) IfCarFound();
    else IfCarNotFound();

    }catch(err){
       console.log(err);
   }
})();


async function waitAndClick(selector, newTab) {
    await newTab.waitForSelector(selector, { visible: true });
    await  newTab.click(selector);
}

function runOnConsole(sel){
    return document.querySelector(sel);
  }

async function checkIfCarAvailable(newTab, runOnConsole, sel){
    let ifSel = newTab.waitForSelector(sel, {visible : true});
    if(!ifSel) return newTab.evaluate(runOnConsole, sel);
    else return null
}