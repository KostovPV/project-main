const functions = require('firebase-functions');
const admin = require("firebase-admin")
const nodemailer = require('nodemailer');

admin.initializeApp()


//google account credentials used to send email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    // secure: true,
    auth: {
        user: 'plamenkostov81@gmail.com',
        pass: 'hiszdidvzpfrqziq'
    }
});


exports.sendEmail = functions.firestore
    .document('mail/{mailId}')
    .onCreate((snap, context) => {

        const mailOptions = {
            from: `kidscenter.burgas@gmail.com`,
            to: snap.data().email,
            subject: 'Kids center',
            html: `<p>
            Welcome to The Kid's center  ${snap.data().email}<br>
            </p>
            <h1>You are successfully subscribed to the newsletter</h1>
            <p>We hope you'll have wonderful memories with us</p>
                                `
        };


        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
    });