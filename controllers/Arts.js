const express = require('express');
const Art = require('../models/Art');
const router = express.Router();
const cloudinaryHelper = require('../_helpers/cloudinaryHelper');
const imageHelper = require('../_helpers/imageHelper');



//Get all Arts
router.get('/', async (req, res) => {
  try {
    const arts = await Art.find();
    res.json(arts);
  } catch (err) {
    res.json({ errMsg: err });
  }
});

//Create new Art
router.post('/', imageHelper, async function (req, res) {
  
  let imageUrl;
  
  await cloudinaryHelper.upload(req.file.path, //Cloudinary upload request 
  { public_id: req.body.title }, 
  function(error, result) {
    imageUrl = (result.url); 
  });

  const art = new Art({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    img: imageUrl,
  });

  try {
    const savedArt = await art.save()
    res.json(savedArt);
  } catch (err) {
    res.json({ errorMsg: err });
  }
})

//Get specific Art by Id
router.get('/:artId', async (req, res)=>{
  try{
    const art = await Art.findById(req.params.artId);
    res.json(art);
  }catch(err){
    res.json({errMsg: err});
  }
})

//Delete specific Art from database and it's Image from CLoudinary 
router.delete('/:artId', imageHelper, async (req, res)=>{
  try{
    const art = await Art.findById(req.params.artId);
    console.log(art.img);
    cloudinaryHelper.destroy(art.title , function(error,result) {
      console.log(result, error) });
  }catch(err){
    res.json({errMsg: err});
  }
  
  try{
    const art = await Art.deleteOne({_id: req.params.artId});
    res.json(art);
  }catch(err){
    res.json({errMsg: err});
  }
})

//Update Specific Art by Id
router.put('/edit/:artId', async function (req, res){
  try{
      console.log("update request1");
      const editedArt = await Art.findByIdAndUpdate(
        req.params.artId, 
        
          {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
          }
        
      );
      res.json(editedArt);
  }catch(err){
    res.json({errMsg: err});
  }
})

//Export 
module.exports = router;