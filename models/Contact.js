const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  id: { 
    type: Number
   },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  countryCode: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
module.exports = mongoose.model('contact', ContactSchema);
