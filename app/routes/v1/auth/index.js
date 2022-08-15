import { Router } from 'express';
import userHandler from '../../../controllers/user';
import { AuthMiddleware, ValidationMiddleware } from '../../../middlewares';
import validationSchema from '../../../middlewares/validation/validationSchema';

const router = Router();
const { loginEmailValidator, comparePassword } = AuthMiddleware;
const { validate } = ValidationMiddleware;
const { signInUser } = userHandler;

router.post(
  '/user/login',
  validate(validationSchema.userSignInSchema),
  loginEmailValidator,
  comparePassword,
  signInUser
);

export default router;
