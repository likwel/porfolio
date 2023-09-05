// import { createTransport } from "nodemailer";

const nodemailer = require("nodemailer")
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// View engine setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Static folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('contact');
});

app.post('/send', (req, res) => {
//   const output = `
//     <p>You have a new contact request</p>
//     <h3>Contact Details</h3>
//     <ul>  
//       <li>Name: ${req.body.name}</li>
//       <li>Company: ${req.body.company}</li>
//       <li>Email: ${req.body.email}</li>
//       <li>Phone: ${req.body.phone}</li>
//     </ul>
//     <h3>Message</h3>
//     <p>${req.body.message}</p>
//   `;
    console.log(req.body)
})

app.listen(9990, ()=>{
    console.log("Server start...")
})
// const maillist = [
//   'hsn.andria107@gmail.com',
//   'elie.phidia@outlook.com',
// ];
// // Defines recipients

// const html = `
//     <h1>Hello there</h1>
//     <p>Isn't NodeMailer useful?</p>
//     `

// async function main() {

//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: false,
//     auth: {
//       user: "eliefenohasina@gmail.com",
//       pass: "@laptop12!",
//     },
//   });

//   let info = await transporter.sendMail({
//     from: '<eliefenohasina@gmail.com>',
//     to: maillist, // Mails to array of recipients
//     subject: "Contact Portfolio",
//     html: html,
//     // html: `
//     // <h1>Hello there</h1>
//     // <p>Isn't NodeMailer useful?</p>
//     // <img src="cid:unique@gmail.com>"/>
//     // `,
//     // attachments: [{
//     //     filename: 'image.png',
//     //     path: './img1.jpg',
//     //     cid: 'unique@gmail.com' // Sets content ID
//     //   }],
//   });

//   console.log(info.messageId);
//   console.log(info.accepted); // Array of emails that were successful
//   console.log(info.rejected); // Array of unsuccessful emails
// }

// main()
// .catch(err => console.log(err));