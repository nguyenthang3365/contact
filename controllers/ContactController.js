var contactm= require('../models/contact.js');
var taikhoan = require('../models/taikhoan.js');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.login = function (req, res) {
    res.render('login', { title: 'login',err:""});
};
exports.loginPost = function (req, res) {
    req.session.email = req.body.email;
    req.session.password= req.body.password;
    taikhoan.find({account :req.session.email,password :req.session.password},function(err,dulieu){
         if(dulieu.length>0)
         { 
            res.redirect("/xem");
         }
        else
        {  
            req.session.err = "thong tin ko chinh xac"
            res.render("login",{title:"login",err:req.session.err});
        }
    })
   
};
exports.view = function (req, res) {
            sosanphamtren1trang = 3;
            page = req.query.page;
            if(page)
            { 
                active=page;
                offset=( sosanphamtren1trang*page)- sosanphamtren1trang;
                contactm.find({}, function (err,data) {
                    if(data.length>0)
                    { 
                        countpage = data.length/ sosanphamtren1trang;
                        databas = data.slice(offset,offset+ sosanphamtren1trang);
                        res.render('xem', { title:'xem du lieu',dulieu:databas ,countpage:Math.ceil(countpage),active:active});
                    }
                  });
            }
            else
            { 
                active=1;
                contactm.find({}, function (err,data) {
                    if(data.length>0)
                    { 
                        countpage = data.length/ sosanphamtren1trang ;
                        databas = data.slice(0, sosanphamtren1trang );
                        res.render('xem', { title:'xem du lieu',dulieu:databas ,countpage:Math.ceil(countpage),active:active });
                    }
                  });
            }
        
};
exports.delete = function (req, res) {
    var id = req.params.idcanxoa;
    contactm.findByIdAndRemove(id).exec();
    res.redirect("/xem");
};
exports.edit = function (req, res) {
    var id = req.params.idcansua;
    contactm.find({_id : id},function(err,dulieu){
    res.render('sua',{title:"sua du lieu",dulieu:dulieu});
    })
};
exports.update = function (req, res) {
    var id = req.params.idcansua;
    contactm.findById(id, function (err, contactm) {
      if (err) return handleError(err);
      contactm.name =  req.body.name;
      contactm.phone = req.body.phone;

      contactm.save();
    });
    res.redirect("/xem");
};
exports.create = function (req, res) {
    res.render('them',{ title: 'them du lieu'});
};
exports.insert = function (req, res) {
    var phantu={
        name: req.body.name,
        phone: req.body.phone,
      };
      var dulieu = new contactm(phantu);
      dulieu.save();
      res.redirect("/xem");
};
exports.search = function (req, res) {
    var  name = req.query.name;
    contactm.find({}, function (err,data) {
      var data1=data.filter(function(item){
         return item.name.indexOf(name) !== -1;
      })
      res.render('xem', { title:'tim kiem du lieu',dulieu:data1});
    });
};

