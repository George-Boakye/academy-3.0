import { User, Application, Assessment } from '../models';
import { constants } from '../utils';
import { AuthHelper, GenericHelper, ErrorFactory } from '../utils/helpers';
import cloudinary from '../../config/cloudinary/cloudinary';

const { successResponse, errorResponse } = GenericHelper;
const { SUCCESS_RESPONSE, LOGIN_USER_SUCCESSFULLY, SUCCESS } = constants;

const addUser = async (req, res) => {
  const { hashString } = AuthHelper;
  try {
    const { password, ...bodyObj } = req.body;
    const { salt, hash } = hashString(password);
    const { _id, firstName, lastName } = await User.create({
      ...bodyObj,
      salt,
      role: 'User',
      applied: false,
      is_admin: false,
      password: hash,
      details: null
    });
    return successResponse(res, {
      data: { _id, firstName, lastName },
      message: SUCCESS_RESPONSE,
      code: 201
    });
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};

const signInUser = (req, res) => {
  try {
    const { _id, firstName, lastName, applied, is_admin, role } = req.user;
    const { token } = AuthHelper.addTokenToData({
      _id,
      firstName,
      lastName,
      role,
      applied,
      is_admin
    });
    return successResponse(res, {
      data: { _id, firstName, lastName, role, applied, is_admin, token },
      message: LOGIN_USER_SUCCESSFULLY
    });
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};

const createApplication = async (req, res) => {
  try {
    const { body } = req;
    const { _id } = req.data;
    const { cv, img } = req.files;
    const imgRes = await cloudinary.uploader.upload(img.tempFilePath);
    const cvRes = await cloudinary.uploader.upload(cv.tempFilePath);
    const details = await Application.create({
      ...body,
      img: imgRes.url,
      cv: cvRes.url,
      status: 'Pending',
      score: 0,
      applicant: _id
    });
    await User.findByIdAndUpdate(_id, { applied: true, details: details._id });
    const { firstName, lastName, applied, is_admin, role } = await User.findById(_id);
    const { token } = AuthHelper.addTokenToData({ firstName, lastName, role, applied, is_admin });
    return successResponse(res, { data: { details, token }, message: SUCCESS, code: 201 });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await Application.findOne({ applicant: req.params.userId });
    return successResponse(res, { data: user, message: SUCCESS_RESPONSE });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Assessment.find();
    return successResponse(res, { data: questions, message: SUCCESS_RESPONSE });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { body } = req;
    const update = await Application.findOneAndUpdate(
      { applicant: req.params.userId },
      {
        $set: { ...body }
      }
    );
    return successResponse(res, { data: update, message: SUCCESS_RESPONSE });
  } catch (error) {
    errorResponse(req, res, error);
  }
};
export default { addUser, signInUser, createApplication, getUser, getQuestions, updateUser };
