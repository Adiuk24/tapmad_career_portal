import { Router } from 'express';
import * as jobsController from '../controllers/jobs.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', jobsController.getJobs);
router.get('/:id', jobsController.getJobById);

// Protected routes (HR/Admin only)
router.post('/', authenticate, requireRole('hr', 'admin'), jobsController.createJob);
router.put('/:id', authenticate, requireRole('hr', 'admin'), jobsController.updateJob);
router.delete('/:id', authenticate, requireRole('hr', 'admin'), jobsController.deleteJob);

export default router;

