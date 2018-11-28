const express = require('express');
const models = require('../models');

const router = express.Router();


//Sample Database GET (All Item Names from "Products" Table) Route
router.get('/',(req, res) => {
      models.Product.findAll()
      .then((name) => {
        res.render('index', { name, title:'Epaste' });
});
});

//Sample Routes for Reference
/*//Test Get for Post
router.get('/post',(req, res) => {
      models.Product.findAll()
      .then((price) => {
        res.render('post', { price, title:'Epaste' }); //Looks for "Post" view
});
});

router.post('/', (req, res) => {
  res.json({
    msg: "Successful POST to '/' route"
  });
});

router.put('/:id', (req, res) => {
  res.json({
    msg: "Successful PUT to '/' route",
    id: req.params.id
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    msg: "Successful DELETE to '/' route",
    id: req.params.id
  });
});*/


module.exports = router;
