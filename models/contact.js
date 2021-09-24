const mongoose = require('mongoose');
var contact = new mongoose.Schema({ name: 'string', phone: 'number' },{collection:'contact'});
module.exports = mongoose.model('contact',contact);