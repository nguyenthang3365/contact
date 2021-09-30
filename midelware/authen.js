
var contactm= require('../models/contact.js');
var taikhoan= require('../models/taikhoan.js');

exports.check =function(req, res, next)
{ 
    taikhoan.find({account :req.session.email,password :req.session.password},function(err,dulieu){
         if(dulieu.length>0)
         { 
           return next();
         }
         else
         { 
            res.redirect("/login");
         }
    })
}
