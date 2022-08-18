import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const applicationSchema = new Schema(
  {
    img: { type: String },
    cv: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    university: { type: String, required: true },
    course: { type: String, required: true },
    cgpa: { type: Number, required: true },
    status: { type: String, required: true },
    score: { type: Number },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const Application = model('Application', applicationSchema);
export default Application;
