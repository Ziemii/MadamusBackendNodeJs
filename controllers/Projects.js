const express = require('express');
const Project = require('../models/project');
const router = express.Router();
const imageHelper = require('../_helpers/imageHelper');
const cloudinaryHelper = require('../_helpers/cloudinaryHelper');


//Get all posts
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.json({ errMsg: err });
  }
});

//Create new project
router.post('/', imageHelper, async function (req, res) {
  let imageUrl;
  await cloudinaryHelper.upload(req.file.path,
    { public_id: req.body.title }, 
    function(error, result) {
      imageUrl = (result.url); 
    });
  
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    img: imageUrl,
  });
  try {
    const savedProject = await project.save()
    res.json(savedProject);
  } catch (err) {
    res.json({ errorMsg: err });
  }

})

//Get specific post
router.get('/:projectId', async (req, res)=>{
  try{
    const project = await Project.findById(req.params.projectId);
    res.json(project);
  }catch(err){
    res.json({errMsg: err});
  }
})

//Delete specific post and image
router.delete('/:projectId', async (req, res)=>{
  try{
    const project = await Project.findById(req.params.projectId);
    console.log(project.img);
    cloudinaryHelper.destroy(project.title , function(error,result) {
      console.log(result, error) });
  }catch(err){
    res.json({errMsg: err});
  }
  
  try{
    
    const project = await Project.deleteOne({_id: req.params.projectId});
    
    
    res.json(project);
  }catch(err){
    res.json({errMsg: err});
  }
})

//Update Specific post
router.put('/edit/:projectId', async function (req, res){
  
  


  try{

      console.log("update request1");
      const editedProject = await Project.findByIdAndUpdate(
        req.params.projectId, 
        
          {
            title: req.body.title,
            description: req.body.description,
          }
        
      );
      res.json(editedProject);
    
    
      
  }catch(err){
    res.json({errMsg: err});
  }
})



//Export 
module.exports = router;