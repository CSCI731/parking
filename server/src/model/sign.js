import mongoose from 'mongoose';

const signSchema = mongoose.Schema({
  boro: { type: String, required: true },
  order_no: { type: String, required: true },
  sequence: { type: Number, required: true },
  distance: { type: Number, required: true },
  arrow_pt: { type: String },
  description: { type: String },
  code: { type: String, require: true },
});

const Sign = mongoose.model('sign', signSchema);

export default Sign;
