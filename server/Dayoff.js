const mongoose = require('mongoose')
require('./User.js')
const Schema = mongoose.Schema;

const DayoffSchema = new mongoose.Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, ref: 'User' 
    },
    started: {
      type: Date,
      required: true,
    },
    timespan: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    condition:{
        type: String,
        enum : ['yes','no','wait'],
        default: 'wait',
    }
  }
);

mongoose.model("Dayoff",DayoffSchema)
module.exports = {DayoffSchema}