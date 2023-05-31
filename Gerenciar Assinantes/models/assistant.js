const mongoose = require('mongoose');

const assistantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Assistant = mongoose.model('Assistant', assistantSchema);

module.exports = Assistant;
