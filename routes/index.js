var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Requisição GET para formulário de registro
router.get('/register', function(req,res,next){
  res.render('register');
})

module.exports = router;
