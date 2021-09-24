var express = require('express');
const app = require('../app.js');
const { use } = require('../app.js');
var router = express.Router();
var contactm= require('../models/contact.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/xem',function(req, res, next) {
  contactm.find({}, function (err,data) {
    res.render('xem', { title:'xem du lieu',dulieu:data });
  });

});
//xoa
router.get('/xoa/:idcanxoa', function(req, res, next) {
     var id = req.params.idcanxoa;
     contactm.findByIdAndRemove(id).exec();
     res.redirect("/xem");
});
//sua
router.get('/sua/:idcansua', function(req, res, next) {
  var id = req.params.idcansua;
  contactm.find({_id : id},function(err,dulieu){
       res.render('sua',{title:"sua du lieu",dulieu:dulieu});
  })
});
//
router.post('/sua/:idcansua', function(req, res, next) {
  var id = req.params.idcansua;
  contactm.findById(id, function (err, contactm) {
    if (err) return handleError(err);
    contactm.name =  req.body.name;
    contactm.phone = req.body.phone;
    contactm.save();
  });
  res.redirect("/xem");
});
//them
router.get('/them', function(req, res, next) {
    res.render('them',{ title: 'them du lieu'});
})
//
router.post('/them', function(req, res){
     var phantu={
       name: req.body.name,
       phone: req.body.phone,
     };
     var dulieu = new contactm(phantu);
     dulieu.save();
     res.redirect("/xem");
});
//tim kiem
router.get('/search', function(req, res, next) {
    var name = req.query.name;
    contactm.find({}, function (err,data) {
      var data1=data.filter(function(item){
         return item.name.indexOf(name) !== -1;
      })
      res.render('xem', { title:'tim kiem du lieu',dulieu:data1});
    });
})
module.exports = router;
