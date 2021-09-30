var express = require('express');
const app = require('../app.js');
const { use } = require('../app.js');
var router = express.Router();
var contr = require('../controllers/ContactController.js');
var contactm= require('../models/contact.js');
var check = require('../midelware/authen.js')

/* GET home page. */
// var a=5;
// var b=5;
// router.use('/xem',(req, res,next) => {
//     if( req.session.email=="abc")   
//     { 
//       return next();
//     }
//     res.render('login', { title: 'login' });
// });

router.get('/test',contr.test);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//
router.get('/login', contr.login);
//
router.post('/login',contr.loginPost);
//
router.get('/xem',check.check,contr.view);
//xoa
router.get('/xoa/:idcanxoa',check.check, contr.delete);
//sua
router.get('/sua/:idcansua',check.check,contr.edit);
//
router.post('/sua/:idcansua',check.check, contr.update);
//them
router.get('/them',check.check,contr.create);
//
router.post('/them',check.check, contr.insert);
//tim kiem
router.get('/search',check.check,contr.search);
module.exports = router;
