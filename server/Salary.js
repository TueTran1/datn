const mongoose = require('mongoose')
require('./User.js')
const Schema = mongoose.Schema;

const SalarySchema = new mongoose.Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, ref: 'User' 
    },
    updated: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
  }
);

mongoose.model("Salary",SalarySchema)
module.exports = {SalarySchema}