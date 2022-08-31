import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const adminSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    is_admin: false,
    img: { type: String },
    time: String
  },
  { timestamps: true }
);
const Admin = model('Admin', adminSchema);
export default Admin;
