const puppeteer = require("puppeteer");
const nodemailer = require('nodemailer');
// const client = require('twilio');
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
    let notAvailable = await newTab.waitForSelector(".empty-search");
    if(notAvailable){
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'testingid295@gmail.com',
          pass: 'Aditi@123'
        }
      });
      var mailOptions = {
        from: 'testingid295@gmail.com',
        to: 'aditisahu193@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'There are no cars available on your selected time and location.'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    
      
    } 
    let available = await newTab.waitForSelector(".car-list-layout");
    if(available){
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'testingid295@gmail.com',
          pass: 'Aditi@123'
        }
      });
      var mailOptions = {
        from: 'testingid295@gmail.com',
        to: 'aditisahu193@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'Yeah car booked be ready to drive. Happy journey!'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }


  }catch(err){
      console.log(err);
  }
})();

async function waitAndClick(selector, newTab) {
    await newTab.waitForSelector(selector, { visible: true });
    await  newTab.click(selector);
}