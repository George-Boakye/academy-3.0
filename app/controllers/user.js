import User from '../models/user';
import { constants } from '../utils';
import { AuthHelper, GenericHelper, ErrorFactory } from '../utils/helpers';

const { successResponse } = GenericHelper;
const { SUCCESS_RESPONSE, LOGIN_USER_SUCCESSFULLY } = constants;

const addUser = async (req, res) => {
  const { hashString } = AuthHelper;
  try {
    const { password, ...bodyObj } = req.body;
    const { salt, hash } = hashString(password);
    const user = await User.create({
      ...bodyObj,
      salt,
      role: 'User',
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
    return successResponse(res.header('X-Auth-Token', token), {
      data: user,
      message: LOGIN_USER_SUCCESSFULLY
    });
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};
export default { addUser, signInUser };
