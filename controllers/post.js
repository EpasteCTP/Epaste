const express = require('express');
const models = require('../models');
const fs = require('fs');
const multer = require('multer');

const router = express.Router();

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


//Get Route for Post Page
router.get('/',(req, res) => {
res.render('post', {title:'Epaste' }); 
});


//Post Route for Post Page
router.post('/', upload.single('productImageInput'), (req, res) => {
    let filename = req.file.filename;
    //Checks to see if Image Properly Uploaded
    if (req.file) {
        console.log('Uploading file...'+filename);
        let uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        filename = 'FILE NOT UPLOADED'; 
    } 

  //Creates Folder with Unique Path for Product Image (If Collision Found New Folder Path Generated)
  let filepath ="";
  let storedFilePath ="";
  while(true){
      filepath="public/product/"+randomPath();
      storedFilePath = filepath.substring(7); //Static Files are Served from /product not Root
      console.log(filepath +"TRUE FILE PATH");
      console.log(storedFilePath +"STORED FILE PATH");
      
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
      image_path: storedFilePath, //Unique Path Eventually
      featured_image:filename
    })
    .catch((err) => {
      console.log('Error while creating new Post');
    });

  models.Product_Images.create({
      file_directory: storedFilePath,
      filename: filename
    })
    .then((post) => {
      res.redirect('/post');
    })
    .catch((err) => {
      console.log(err);
    })
});

module.exports = router;
