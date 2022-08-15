import User from '../models/user';
import { ApiError, constants } from '../utils';
import { AuthHelper, GenericHelper } from '../utils/helpers';
const { successResponse, errorResponse } = GenericHelper;

const addUser = async (req, res) => {
  const { hashString } = AuthHelper;
  try {
    const { firstName, lastName, emailAddress, phoneNumber, password } = req.body;
    const { salt, hash } = hashString(password);
    const user = await User.create({
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      salt,
      password: hash
    });
    return successResponse(res, { user });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export default { addUser };
