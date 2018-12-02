const express = require('express');
const models = require('../models');
const fs = require('fs');
const multer = require('multer');

const router = express.Router();

//Get Route for Post Page
router.get('/',(req, res) => {

res.render('post', {title:'Epaste' }); 
});

//Generates Random 10 Digit Number (Used for File Path Generation)
const randomPath = () => Math.floor(Math.random() * 9000000000) + 1000000000;

//Moves Single File Upload to Temporary Folder
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/product/temp")   
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)      
    }
})
let upload = multer({ storage: storage });


router.post('/', upload.single('productImageInput'), (req, res) => {
    //Checks to see if Image Properly Uploaded
    if (req.file) {
        let filename = req.file.filename;
        console.log('Uploading file...'+filename);
        let uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        let filename = 'FILE NOT UPLOADED'; 
        let uploadStatus = 'File Upload Failed';
    } 

  //Creates Folder with Unique Path for Product Image (If Collision Found New Folder Path Generated)
  let filepath ="";
  while(true){
      filepath="public/product/"+randomPath();
      console.log(filepath);
      if(!fs.existsSync(filepath)){
        fs.mkdirSync(filepath);
        console.log("New Image Path Created");
        break;
      } else {
        console.log("Path Collision, Generating New Path");
      }
    }

  //Moves Image from "Temp" to Specified Folder
  let oldPath = 'public/product/temp/'+req.file.filename;
  let newPath = filepath+'/'+req.file.filename;

  fs.rename(oldPath, newPath, function (err) {
    if (err) throw err
  })


  models.Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      image_path: filepath //Unique Path Eventually
    })
    .then((post) => {
      res.redirect('/post');
    })
    .catch((err) => {
      console.log('ERROR while creating a new post');
      //res.redirect('/error');
    })
});

module.exports = router;
