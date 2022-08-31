import cloudinary from '../../config/cloudinary/cloudinary';
import { Assessment, User, BatchApplication, Admin, Application } from '../models';
import { constants } from '../utils';
import { GenericHelper, ErrorFactory, AuthHelper } from '../utils/helpers';

const { successResponse, errorResponse } = GenericHelper;
const { SUCCESS_RESPONSE, LOGIN_USER_SUCCESSFULLY } = constants;

const createAdmin = async (req, res) => {
  const { hashString } = AuthHelper;
  try {
    const { password, ...bodyObj } = req.body;
    const { img } = req.files;
    const imgRes = await cloudinary.uploader.upload(img.tempFilePath);
    const { salt, hash } = hashString(password);
    const { _id, fullName } = await Admin.create({
      ...bodyObj,
      salt,
      role: 'Admin',
      is_admin: true,
      password: hash,
      img: imgRes.url,
      time: null
    });
    return successResponse(res, {
      data: { _id, fullName },
      message: SUCCESS_RESPONSE,
      code: 201
    });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

const signInAdmin = (req, res) => {
  try {
    const { _id, is_admin, role, country, fullName } = req.user;
    const { token } = AuthHelper.addTokenToData({
      _id,
      fullName,
      role,
      country,
      is_admin
    });
    return successResponse(res, {
      data: { _id, fullName, role, is_admin, token },
      message: LOGIN_USER_SUCCESSFULLY
    });
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.adminId);
    return successResponse(res, { data: admin, message: SUCCESS_RESPONSE });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

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

const updateAdmin = async (req, res) => {
  try {
    const { body } = req;
    const { img } = req.files;
    const imgRes = await cloudinary.uploader.upload(img.tempFilePath);
    const update = await Admin.findByIdAndUpdate(req.params.id, {
      $set: { ...body, img: imgRes.url }
    });
    return successResponse(res, { data: update, message: SUCCESS_RESPONSE });
  } catch (error) {
    errorResponse(req, res, error);
  }
};
const updateTimer = async (req, res) => {
  try {
    const { time } = req.body;
    const update = await Admin.findByIdAndUpdate(req.params.id, {
      $set: { time }
    });
    return successResponse(res, { data: update, message: SUCCESS_RESPONSE });
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const updateApplicants = async (req, res) => {
  try {
    const { body } = req;
    const update = await Application.updateMany({}, { $set: { ...body } });
    return successResponse(res, { data: update, message: SUCCESS_RESPONSE });
  } catch (error) {
    errorResponse(req, res, error);
  }
};

export default {
  createAssessment,
  getApplicants,
  createBatchApplication,
  getBatchApplications,
  updateAdmin,
  createAdmin,
  signInAdmin,
  getAdmin,
  updateApplicants,
  updateTimer
};
