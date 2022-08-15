import { Router } from 'express';
import userValidations from '../../../middlewares/userValidations';
import userHandler from '../../../controllers/user';

const { addUser } = userHandler;
const { validateSignUpSchema, validateUserSignUp } = userValidations;

const router = Router();

router.post('/user/signup', validateSignUpSchema, validateUserSignUp, addUser);

export default router;
