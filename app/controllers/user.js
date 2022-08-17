import User from '../models/user';
import Application from '../models/application';
import { constants } from '../utils';
import { AuthHelper, GenericHelper, ErrorFactory } from '../utils/helpers';

const { successResponse } = GenericHelper;
const { SUCCESS_RESPONSE, LOGIN_USER_SUCCESSFULLY, SUCCESS } = constants;

const addUser = async (req, res) => {
  const { hashString } = AuthHelper;
  try {
    const { password, ...bodyObj } = req.body;
    const { salt, hash } = hashString(password);
    const user = await User.create({
      ...bodyObj,
      salt,
      role: 'User',
      applied: false,
      is_admin: false,
      password: hash
    });
    return successResponse(res, { data: user, message: SUCCESS_RESPONSE, code: 201 });
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};

const signInUser = (req, res) => {
  try {
    const { user } = req;
    const { token } = AuthHelper.addTokenToData(user.toJSON());
    return successResponse(res, {
      data: { user, token },
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
    const details = await Application.create({
      ...body,
      img: req.files.img.data,
      cv: req.files.cv.data,
      status: 'Pending',
      score: 0,
      applicant: _id
    });
    await User.findByIdAndUpdate(_id, { applied: true });
    return successResponse(res, { data: details, message: SUCCESS, code: 201 });
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};
export default { addUser, signInUser, createApplication };
