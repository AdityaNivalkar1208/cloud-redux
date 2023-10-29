const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobSchema = new Schema({
    job_title: { type: String, required: true },
    job_company: { type: String, required: true },
    job_description: { type: String, required: true },
    job_posting_date: { type: String, required: true },
    job_location: { type: String, required: true },
    type_of_job: { type: String, required: true },
    package: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now
    },
});
const Job = mongoose.model('job', JobSchema);
module.exports = Job;