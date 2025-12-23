import { Response, NextFunction } from 'express';
import * as usersService from '../services/users.service';
import { AuthRequest } from '../middleware/auth.middleware';

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const profile = await usersService.getUserProfile(req.userId);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const profile = await usersService.updateUserProfile(req.userId, req.body);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const uploadResume = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { resumeUrl } = req.body;
    const result = await usersService.uploadResume(req.userId, resumeUrl);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

