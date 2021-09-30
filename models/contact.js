const mongoose = require('mongoose');
var contact = new mongoose.Schema({ name: 'string', phone: 'number' },{collection:'contact'});
module.exports = mongoose.model('contact',contact);
 // vi tri select bang (sptren1trang * sotrang)-sptren1trang;