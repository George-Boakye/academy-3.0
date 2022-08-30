import { Router } from 'express';
import adminValidations from '../../../middlewares/admin/adminValidations';
import adminHandler from '../../../controllers/admin';
import validationSchema from '../../../middlewares/validation/validationSchema';
import { ValidationMiddleware } from '../../../middlewares';

const { createAdmin } = adminHandler;
const { validateAdminSignUp } = adminValidations;
const { validate } = ValidationMiddleware;

const router = Router();

router.post(
  '/admin/signup',
  validate(validationSchema.adminSignUpSchema),
  validateAdminSignUp,
  createAdmin
);

export default router;
