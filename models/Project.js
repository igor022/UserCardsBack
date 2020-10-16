const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
  },
  price: {
    type: String,
    required: true
  },
  devs: [],
}, { timestamps: true })

const Project = mongoose.Model('Project', projectSchema);

export default Project;