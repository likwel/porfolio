// import { createTransport } from "nodemailer";

const nodemailer = require("nodemailer")
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

require('dotenv').config();

// View engine setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Static folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
//   res.send('Portfolio by Elie Andriatsitohaina');
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/send', (req, res) => {

    const senderMessage = req.body.senderMessage
    const senderEmail = req.body.senderEmail
    const senderName = req.body.senderName
    const senderPhone = req.body.senderPhone
    const senderAttachments = req.body.senderAttachments

    const output = `
        <p>Vous avez réçu un contact de la part de ${senderEmail}</p>
        <h3>Détails de l'expéditeur</h3>
        <ul>  
        <li>Nom: ${senderName}</li>
        <li>Email: ${senderEmail}</li>
        <li>Téléphone: ${senderPhone}</li>
        </ul>
        <h3>Message</h3>
        <p style="font-style : italic; border-left:2px solid #871bf2; background-color:#eee;margin:5px 5px;padding:5px 5px;">${senderMessage}</p>

    `;

    // const attachments = [{
    //     filename: 'image.png',
    //     path: './img1.jpg',
    //     cid: 'unique@gmail.com' // Sets content ID
    //   }]

    let transporter = nodemailer.createTransport({
        host: 'smtp-shopraphia.alwaysdata.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.USER_TRANSPORTER_ID,
            pass: process.env.USER_TRANSPORTER_PASS
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Contact Portfolio"<'+process.env.USER_TRANSPORTER_ID+'>', // sender address
        to: 'eliefenohasina@gmail.com', // list of receivers
        subject: 'Contact Portfolio', // Subject line
        html: output,// html body
        attachments : senderAttachments
    };

    // send mail with defined transport object

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                res.send({status : 500, message : error.message})
            }else{
                res.send({status : 200, message : 'success'})

                console.log('Message sent successfully!');
                //console.log(nodemailer.getTestMessageUrl(info));
    
                // only needed when using pooled connections
                transporter.close();
            }

        });

})

app.listen(9990, ()=>{
    console.log("Server started...")
})