import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const batchSchema = new Schema(
  {
    file: { type: String },
    link: { type: String },
    closureDate: { type: String },
    batchId: { type: Number, required: true },
    instructions: { type: String },
    questions: [{ type: mongoose.Types.ObjectId, ref: 'Assessment' }],
    timeAllocated: { type: String },
    status: { type: String }
  },
  { timestamps: true }
);

const BatchApplication = model('BatchApplication', batchSchema);
export default BatchApplication;
