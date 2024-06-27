const mongoose = require('mongoose');
const tripschema = new mongoose.Schema({
  Vechial :{
    type:mongoose.Schema.ObjectId,
    ref:'vechial'
  },

  Customer:{
    type:mongoose.Schema.ObjectId,
    ref:'user'
   
  },
  Date:{
      type:String,
      require:true
      

  },
  Material:{
      type:String,
      require:true

  },
  UnloadingPlace:{
    type:String,
    require:true

  },
  Qty:{
    type:Number,
    require:true,
    

  }
  ,
  LoadingPlace:{
    type:String,
    require:true

  }  ,
  Charges:{
    type:Number,
    require:true

  }
  ,
  TonPrice:{
    type:Number,
    require:true

  }
  ,
  TotalAmount:{
    type:Number,
    require:true

  },
  date: { type: Date, default: Date.now }
})


const trips = mongoose.model('trip',tripschema);
module.exports = trips;