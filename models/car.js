const mongoose = require('mongoose');

module.exports = mongoose.model('Car', new mongoose.Schema({
  make: {
    type: String
  },
  model: {
    type: String
  }, 
  year: {
    type: Number
  }
}));