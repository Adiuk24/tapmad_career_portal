import { Response, NextFunction } from 'express';
import * as savedJobsService from '../services/saved-jobs.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const saveJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { jobId } = req.body;
    const savedJob = await savedJobsService.saveJob(req.userId, jobId);
    res.status(201).json(savedJob);
  } catch (error) {
    next(error);
  }
};

export const unsaveJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const result = await savedJobsService.unsaveJob(req.userId, req.params.jobId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getSavedJobs = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const result = await savedJobsService.getSavedJobs(req.userId, page, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

