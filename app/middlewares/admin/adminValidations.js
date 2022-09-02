import { Admin } from '../../models';
import { constants, helpers } from '../../utils';

const { ErrorFactory } = helpers;
const { RESOURCE_ALREADY_EXIST } = constants;

const validateAdminSignUp = async (req, res, next) => {
  try {
    const user = await Admin.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({
        message: RESOURCE_ALREADY_EXIST('Email'),
        data: []
      });
    }
    next();
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};

export default {
  validateAdminSignUp
};
