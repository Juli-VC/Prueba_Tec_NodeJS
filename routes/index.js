var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");
const contactController = require("../controllers/contactController");

/* GET home page. */
router.get('/', indexController.viewHome);
router.get('/index', indexController.viewHome);
/* GET ToS page. */
router.get('/Tos', indexController.viewTos);
/* GET Contact page. */
router.get('/Contacto', contactController.viewContact);
/* GET Contact page. */
router.get('/Envio_de_Formulario', contactController.viewcontactResponse);


/* POST Contact Form */
router.post('/sendContactForm', contactController.sendContactForm);

/* POST Register User */
router.post('/register', indexController.registerUser);
/* POST Login User */
router.post('/loginUser', indexController.loginUser);
router.get('/loginUser', indexController.viewHome);
router.get('/logout', indexController.logout);



module.exports = router;
