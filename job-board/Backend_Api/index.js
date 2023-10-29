const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000; // Set your desired port

const db = require('./db'); // Import the database configuration from db.js

var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static('images'))
app.use('/resume', express.static('resume'))

app.use('/api/employee', require('./routes/employee'))
app.use('/api/employer', require('./routes/employer'))
app.use('/api/email', require('./routes/email'))
app.use('/api/job', require('./routes/job'))
app.use('/api/forgot', require('./routes/forgot'))

// Define your routes and models here

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});