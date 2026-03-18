var express = require('express');
const userController = require('../modules/user/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');
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
router.get('/feed', authMiddleware, async (req, res) => {
  const user = await userController.getProfile(req.session.user.id);
   res.render('home', { user });
});

router.get('/profile/edit', authMiddleware, async (req, res) => {
    const user = await userController.getProfile(req.session.user.id);
    res.render('edit-profile', { user });
});

router.post('/profile/edit', authMiddleware, upload.single('profilePicture'), userController.updateProfile);

module.exports = router;
