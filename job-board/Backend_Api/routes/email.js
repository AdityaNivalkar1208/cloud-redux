const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

// send mail
router.post("/signup", (req, res) => {
    const { email } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "JobHive",
            html: '<h3>Congratulation You Successfully Register</h3>',
            text: 'Thank You ....! ',

        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error", error)
            } else {
                console.log("Email sent" + info.response);
                res.status(201).json({ status: 201, info })
            }
        });

    } catch (error) {
        res.status(401).json({ status: 401, error })

    }
})

router.post("/registrationEmail", (req, res) => {
    const { email, name } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "JobHive",
            html: `<h3> Hii ${name}, </h3><br><p>Successfully Registered</p><br><p>Welcome to the JobHive</p>`,
            text: 'Thank You.... !'
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error", error)
            } else {
                console.log("Email sent" + info.response);
                res.status(201).json({ status: 201, info })
            }
        });

    } catch (error) {
        res.status(401).json({ status: 401, error })

    }
})

module.exports = router