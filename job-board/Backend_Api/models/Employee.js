const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    phone_no: { type: Number, required: true },
    profile_img: { type: String },
    resume: { type: String },
    date_of_birth: { type: String, required: true },
    skill: { type: String },

    date: {
        type: Date,
        default: Date.now
    },
});
const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;