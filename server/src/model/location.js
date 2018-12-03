import mongoose from 'mongoose';
import SignModel from 'model/sign';

const locationSchema = mongoose.Schema({
  boro: { type: String, require: true },
  order_no: { type: String, require: true },
  main_st: { type: String, require: true },
  from_st: { type: String, require: true },
  to_st: { type: String, require: true },
  sos: { type: String, require: true },
});

locationSchema.post('remove', async function (location) {
  await SignModel.deleteMany({ boro: location.boro, order_no: location.order_no });
});

const Location = mongoose.model('location', locationSchema);

export default Location;
