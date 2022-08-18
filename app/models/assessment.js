import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const AssessmentSchema = new Schema(
  {
    question: { type: String, required: true },
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: { type: String, required: true },
    d: { type: String, required: true },
    correctAnswer: String
  },
  { timestamps: true }
);

const Assessment = model('Assessment', AssessmentSchema);

export default Assessment;
