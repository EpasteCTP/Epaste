const express = require('express');
const models = require('../models');

const router = express.Router();

//Get Route for Index Page
router.get('/',(req, res) => {
  models.Product.findAll({attributes: ['name', 'image_path', 'featured_image']}).then((results) => {

  res.render('index',{title:'Epaste', products:results});
});
});

//Get Route for Featured Products JSON
router.get('/featured',(req, res) => {
  models.Product.findAll({attributes: ['name', 'image_path','featured_image']}).then((products) => {

  res.json({products});
});
});


module.exports = router;
