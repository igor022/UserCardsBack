const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  devs: [],
  description: {
    type: String,
  },
}, { timestamps: true })

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;