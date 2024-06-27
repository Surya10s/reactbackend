const mongoose = require('mongoose');
const incomeschema = new mongoose.Schema({
  Amount :{
    type:Number,
    require:true
  },

  By:{
    enum: ["cash", "cheque", "online",'Gpay'],
    type:String,
    require:true

},
Description:{
        type:String
},

Customer:{
  type:mongoose.Schema.ObjectId,
  ref:'user'
 
}
,

Date:{
  type:String,
  require:true 
}

})
const income = mongoose.model('income',incomeschema);
module.exports = income;