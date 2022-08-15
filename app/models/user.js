import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    salt: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
    // details: [{ userDetails: { type: mongoose.Types.ObjectId }, ref: 'Details' }]
  },
  { timestamps: true }
);
const User = model('User', userSchema);
export default User;
