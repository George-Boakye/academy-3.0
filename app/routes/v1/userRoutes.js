import { Router } from 'express';
import userValidations from '../../middlewares/userValidations';
import userHandler from '../../controllers/user';

const { addUser } = userHandler;
const { validateSignUpSchema, validateSignInSchema, validateUserSignIn, validateUserSignUp} =
  userValidations;

const router = Router();

router.post('/user/signup', validateSignUpSchema, validateUserSignUp, addUser);
// router.post('/user/sigin', validateSignInSchema, validateUserSignIn, signInUser);

export default router;
