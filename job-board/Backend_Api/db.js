const mongoose = require('mongoose');

// Define your MongoDB URL
const mongoDBUrl = 'mongodb://localhost:27017/jobHive';

mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;