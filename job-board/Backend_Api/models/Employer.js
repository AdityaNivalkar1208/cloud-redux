const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployerSchema = new Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employer'
    },
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    phone_no: { type: Number, required: true },
    company_address: { type: String, required: true },
    profile_img: { type: String },
    date_of_birth: { type: String, required: true },
    isEmployer: { type: Boolean, default: true },
    date: {
        type: Date,
        default: Date.now
    },
});
const Employer = mongoose.model('employer', EmployerSchema);
module.exports = Employer;