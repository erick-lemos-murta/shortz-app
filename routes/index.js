var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vídeos Curtos e Engajadores' });
});

// Requisição GET para formulário de registro
router.get('/register', function(req,res,next){
  res.render('register',{title: 'Criar Conta'});
})
//Direciona para o userController.js na função register
router.post('/register', userController.register);

router.get('/login', (req, res) => {
   res.render('login', { title: 'Entrar' });
});

// Rota para processar o formulário de login
router.post('/login', userController.login);

// Rota para processar o logout
router.post('/logout', userController.logout);

// Rota para exibir o feed de vídeos (protegida por autenticação)
router.get('/feed', authMiddleware, (req, res) => {
   res.render('home', { user: req.session.user });
});

module.exports = router;
