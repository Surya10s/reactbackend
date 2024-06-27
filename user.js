const mongoose = require('mongoose');
const trip = require('./trips')
const userschema = new mongoose.Schema({
  username :{
    type:String,
    require:true
  },

  location:{
    type:String,
    require:true

},
  Phoneno:{
    type:Number,
    require:true

}
})

userschema.post('deleteOne', { document: true, query: false }, async function (doc) {
  console.log(doc, 'Deleting user document');
  if (doc) {
      try {
          const tripdelete = await trip.deleteMany({
              Customer: doc._id
          });
          console.log(tripdelete, 'Deleted related trips');
      } catch (error) {
          console.error('Error deleting related trips:', error);
      }
  }
});

const user = mongoose.model('user',userschema);
module.exports = user;