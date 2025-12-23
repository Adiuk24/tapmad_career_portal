import { Router } from 'express';
import * as savedJobsController from '../controllers/saved-jobs.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(requireRole('applicant', 'hr', 'admin'));

router.get('/', savedJobsController.getSavedJobs);
router.post('/', savedJobsController.saveJob);
router.delete('/:jobId', savedJobsController.unsaveJob);

export default router;

