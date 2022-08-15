import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './userRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use(userRoutes);

export default router;
