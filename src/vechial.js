const mongoose = require('mongoose');
const vechialschema = new mongoose.Schema({
  vechialNo :{
    type:String,
     require: true   
  },

  model:{
    type:String,
     require: true   
  }

})
const vechial = mongoose.model('vechial',vechialschema);
module.exports = vechial;