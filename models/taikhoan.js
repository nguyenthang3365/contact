const mongoose = require('mongoose');
var taikhoan = new mongoose.Schema({ account: 'string', password: 'number' },{collection:'taikhoan'});
module.exports = mongoose.model('taikhoan',taikhoan);