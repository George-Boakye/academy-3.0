import Assessment from '../models/assessment';
import User from '../models/user';
import BatchApplication from '../models/batchApplication';
import { constants } from '../utils';
import { GenericHelper, ErrorFactory } from '../utils/helpers';

const { successResponse, errorResponse } = GenericHelper;
const { SUCCESS_RESPONSE } = constants;

const createAssessment = async (req, res) => {
  try {
    const { body } = req;
    // const { _id } = await BatchApplication.find({ batchId: 1 });
    const assessment = await Assessment.create(body);
    // await BatchApplication.updateOne({ {batchId: 1} , {$push:{questions:assessment}}});
    return successResponse(res, { data: assessment, message: SUCCESS_RESPONSE, code: 201 });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

const getApplicants = async (req, res) => {
  try {
    const applicants = await User.find({ applied: true }).populate('details');
    return successResponse(res, { data: applicants, message: SUCCESS_RESPONSE });
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};

const createBatchApplication = async (req, res) => {
  try {
    const { body } = req;
    const batch = await BatchApplication.create({
      ...body,
      questions: [],
      timeAllocated: null,
      status: 'Not Taken'
    });
    return successResponse(res, { data: batch, message: SUCCESS_RESPONSE, code: 201 });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

const getBatchApplications = async (req, res) => {
  try {
    const batches = await BatchApplication.find();
    return successResponse(res, { data: batches, message: SUCCESS_RESPONSE });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

// const updateAdmin = async (req, res) => {
//   try {
//     const { country, ...bodyObj } = req.body;
//     const update = await User.findByIdAndUpdate(req.params.userId, {
//       $set: { ...bodyObj, country: country }
//     });
//   } catch (error) {}
// };

export default { createAssessment, getApplicants, createBatchApplication, getBatchApplications };
