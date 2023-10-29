const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { fetchuser, verifyTokenAndAuthorization, verifyTokenAndAdmin, localVariables } = require('../middleware/fetchuser');
const otpGenerator = require('otp-generator')
const nodemailer = require("nodemailer");
require("dotenv").config();


// generate otp

router.post('/generateOtp', async(req, res) => {
    try {
        let user = await Employee.findOne({ email: req.body.email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Email not exist...!" });
        }
        req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        res.status(201).send({ code: req.app.locals.OTP })
    } catch (error) {
        return res.status(400).send({ error: "Internal Server Error" });

    }
})

router.post('/verifyOtp', async(req, res) => {
    const { code } = req.body;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!' })
    }
    return res.status(400).send({ error: "Invalid OTP" });
})

router.get('/createResetSession', (req, res) => {
    if (req.app.locals.resetSession) {
        return res.status(201).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).send({ error: "Session expired!" })
})

router.put('/resetPassword', async(req, res) => {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(401).send({ error: "Session expired!" });
        }

        const { email, password } = req.body;

        try {
            const user = await Employee.findOne({ email })

            if (!user) {
                return res.status(404).send({ error: "Email not Found" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await Employee.updateOne({ email: user.email }, { password: hashedPassword })
            req.app.locals.resetSession = false; // Reset session

            return res.status(201).send({ msg: "Record Updated...!" });
        } catch (error) {
            return res.status(500).send({ error: "Unable to reset password" });
        }
    } catch (error) {
        return res.status(500).send({ error });
    }
});




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
            subject: "RK Fitness",
            html: `<h3> Hii ${name}, </h3><br><p>Successfully Register</p><br><p>Congratulation now u r member of the fitness</p>`,
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




router.post("/otpverification", (req, res) => {
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
            subject: "Password Recovery",
            html: `<p>Your One Time Password is </p><h3> ${req.app.locals.OTP}, </h3><br><p>Verify Your OTP</p>`,
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