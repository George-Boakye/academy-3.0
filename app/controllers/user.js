import User from '../models/user';
import Application from '../models/application';
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
    return successResponse(res, { data: details, message: SUCCESS, code: 201 });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export default { addUser, signInUser, createApplication };
