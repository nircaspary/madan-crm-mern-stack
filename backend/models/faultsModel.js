const mongoose = require('mongoose');

const faultSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: String,
    required: [true, 'You must fill your ID'],
  },
  description: {
    type: String,
    required: [true, 'You must fill fault description'],
  },
  fileUpload: {
    type: String,
  },

  //For Administrators
  team: {
    type: String,
    default: 'Help Desk',
  },
  status: {
    type: String,
  },
  urgency: {
    type: String,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  completed_at: { type: Date, default: '' },
});
const Fault = mongoose.model('fault', faultSchema);
module.exports = Fault;
