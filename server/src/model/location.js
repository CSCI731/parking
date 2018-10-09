import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
  boro: { type: String, require: true },
  order_no: { type: String, require: true },
  main_st: { type: String, require: true },
  from_st: { type: String, require: true },
  to_st: { type: String, require: true },
  sos: { type: String, require: true },
});

const Location = mongoose.model('location', locationSchema);

export default Location;
