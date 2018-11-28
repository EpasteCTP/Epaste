const express = require('express');
const models = require('../models');

const router = express.Router();

//Test Get for Post
router.get('/',(req, res) => {

res.render('post', {title:'Epaste' }); 
});


router.post('/', (req, res) => {
  models.Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      image_path: "Entered Via Form" //Unique Path Eventually
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
