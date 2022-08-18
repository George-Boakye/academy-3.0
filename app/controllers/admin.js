import Assessment from '../models/assessment';
import User from '../models/user';
import { constants } from '../utils';
import { GenericHelper, ErrorFactory } from '../utils/helpers';

const { successResponse } = GenericHelper;
const { SUCCESS_RESPONSE } = constants;

const createAssessment = async (req, res) => {
  try {
    const { body } = req;
    const assessment = await Assessment.create(body);
    return successResponse(res, { data: assessment, message: SUCCESS_RESPONSE, code: 201 });
  } catch (error) {
    return ErrorFactory.resolveError(error);
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

export default { createAssessment, getApplicants };
