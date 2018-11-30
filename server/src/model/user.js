import mongoose from 'mongoose';
import PassportLocalMongoose from 'passport-local-mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
  active: { type: Boolean, default: true},
  roles: { type: [{ type: String, enum: ['admin', 'user'], default: ['user'] }] }
}, { timeStamps: true });

userSchema.plugin(PassportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  limitAttempts: true,
  maxAttempts: 5,
  findByUsername: (model, queryParameters) => {
    return model.findOne({ ...queryParameters, active: true, });
  },
});

export default mongoose.model('User', userSchema);