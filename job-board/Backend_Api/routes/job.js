const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createjob', async(req, res) => {
    try {
        const { job_title, job_company, job_description, job_posting_date, job_location, type_of_job, package } = req.body;
        const job = new Job({
            job_title,
            job_company,
            job_description,
            job_posting_date,
            job_location,
            type_of_job,
            package
        });

        const savedJob = await job.save();
        res.json(savedJob);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/jobs', async(req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/find/getjob/:id", async(req, res) => {
    try {
        const product = await Job.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router