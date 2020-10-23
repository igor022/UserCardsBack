const Project = require('../models/Project');


const getProjects = async (req, res) => {
  try {
    const results = await Project.find().sort({ createdAt: -1 });
    
    res.send(results);
  } catch(err) {
    res.send(err);
  }
}

const addProject = async (req, res) => {
  try {
    const { project } = req.body;
    const addedProject = new Project(project);
    await addedProject.save();
    
    res.send(addedProject);
  } catch(err) {
    res.send(err);
  }
}

const editProject = async (req, res) => {
  try {
    const { project } = req.body;
    await Project.updateOne({ _id: project._id }, project);
    const updatedProject = await Project.findOne({ _id: project._id});
    console.log(project);
    
    res.send(updatedProject);
  } catch(err) {
    res.send(err);
  }
}

const deleteProject = async (req, res) => {
  try {
    // delete user
    const id = req.body.id;
    const project = await Project.findByIdAndDelete(id);
    
    res.send(project);

  } catch (err) {
    res.send(err);
  }
}


module.exports = {
  getProjects,
  addProject,
  editProject,
  deleteProject
}