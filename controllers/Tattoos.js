const express = require('express');
const Tattoo = require('../models/tattoo');
const cloudinaryHelper = require('../_helpers/cloudinaryHelper');
const imageHelper = require('../_helpers/imageHelper');
const router = express.Router();

//Get all Tattoos from database
router.get('/', async (req, res) => {
  try {
    const tattoos = await Tattoo.find();
    res.json(tattoos);
  } catch (err) {
    res.json({ errMsg: err });
  }
});

//Create new tattoo
router.post('/', imageHelper, async function (req, res) {
  var imageUrl;
  await cloudinaryHelper.upload(req.file.path, //Cloudinary upload request 
  { public_id: req.body.title }, 
  function(error, result) {
    imageUrl = (result.url); 
  });
  
  const tattoo = new Tattoo({
    title: req.body.title,
    description: req.body.description,
    img: imageUrl,
  });
  try {
    const savedTattoo = await tattoo.save()
    res.json(savedTattoo);
  } catch (err) {
    res.json({ errorMsg: err });
  }

})

//Get specific Tattoo by Id
router.get('/:tattooId', async (req, res)=>{
  try{
    const tattoo = await Tattoo.findById(req.params.tattooId);
    res.json(tattoo);
  }catch(err){
    res.json({errMsg: err});
  }
})

//Delete specific Tattoo from database and coresponding image from Cloudinary
router.delete('/:tattooId', async (req, res)=>{
  try{
    const tattoo = await Tattoo.findById(req.params.tattooId);
    console.log(tattoo.img);
    cloudinaryHelper.destroy(tattoo.title , function(error,result) {
      console.log(result, error) });
  }catch(err){
    res.json({errMsg: err});
  }
  
  try{
    const tattoo = await Tattoo.deleteOne({_id: req.params.tattooId});
    res.json(tattoo);
  }catch(err){
    res.json({errMsg: err});
  }
})

//Update specific Tattoo
router.put('/edit/:tattooId', imageHelper, async function (req, res){
  
  try{
      console.log("update request1");
      const editedTattoo = await tattoo.findByIdAndUpdate(
        req.params.tattooId, 
          {
            title: req.body.title,
            description: req.body.description,
          }
      );
      res.json(editedTattoo);
    
    
      
  }catch(err){
    res.json({errMsg: err});
  }
})

//Export 
module.exports = router;