const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const { fetchuser, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';

const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');





const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'resume');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['application/pdf'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', upload.single('resume'), async(req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        // Check whether the user with this email exists already
        // let profile = (req.file) ? req.file.filename : null;
        let user = await Employee.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await Employee.create({
            name: req.body.name,
            phone_no: req.body.phone_no,
            email: req.body.email,
            password: secPass,
            gender: req.body.gender,
            resume: (req.file) ? req.file.filename : null,
            date_of_birth: req.body.date_of_birth,
            skill: req.body.skill,
            address: req.body.address,

        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        success = true;
        // res.json(user)
        res.json({ success, authtoken })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async(req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await Employee.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id,
                email: user.email,
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


});


module.exports = router;