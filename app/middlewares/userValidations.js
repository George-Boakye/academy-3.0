import User from '../models/user';
import { ApiError, constants, helpers } from '../utils';
import { AuthHelper } from '../utils/helpers';
import ValidationMiddleware from './validation';
import validationSchema from './validation/validationSchema';

const { errorResponse } = helpers;
const { RESOURCE_ALREADY_EXIST, INVALID_CREDENTIALS } = constants;
const { userSignUpSchema, userSignInSchema } = validationSchema;
const { validate } = ValidationMiddleware;

const validateSignUpSchema = validate(userSignUpSchema);

const validateUserSignUp = async (req, res, next) => {
  try {
    const user = await User.findOne({ emailAddress: req.body.email });
    if (user) {
      return errorResponse(
        req,
        res,
        new ApiError({
          status: 400,
          message: RESOURCE_ALREADY_EXIST('Email')
        })
      );
    }
    next();
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

const validateSignInSchema = validate(userSignInSchema);
const validateUserSignIn = async (req, res, next) => {
  try {
    const { compareHash } = AuthHelper;
    const user = await User.findOne({ emailAddress: req.body.email });
    const valid = compareHash(req.body.password, user.password, user.salt);
    if (!valid) {
      return errorResponse(
        req,
        res,
        new ApiError({
          status: 404,
          message: INVALID_CREDENTIALS
        })
      );
    }
    next();
  } catch (error) {
    errorResponse(req, res, error);
  }
};

export default {
  validateSignUpSchema,
  validateSignInSchema,
  validateUserSignIn,
  validateUserSignUp
};
