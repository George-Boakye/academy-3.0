import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const AssessmentSchema = new Schema(
  {
    file: { type: String },
    question: { type: String, required: true },
    options: {
      a: { type: String, required: true },
      b: { type: String, required: true },
      c: { type: String, required: true },
      d: { type: String, required: true }
    },
    correctAnswer: String,
    selectedAnswer: String,
    batch: { type: mongoose.Types.ObjectId, ref: 'BatchApplication' }
  },
  { timestamps: true }
);

const Assessment = model('Assessment', AssessmentSchema);

export default Assessment;
