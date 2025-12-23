import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export interface UpdateProfileData {
  fullName?: string;
  phone?: string;
  address?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  bio?: string;
  skills?: string[];
  experienceYears?: number;
  currentPosition?: string;
  education?: any[];
}

export const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      applicantProfile: true,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const updateUserProfile = async (userId: string, data: UpdateProfileData) => {
  const { fullName, ...profileData } = data;

  // Update user basic info
  const updateUser: any = {};
  if (fullName) {
    updateUser.fullName = fullName;
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateUser,
  });

  // Update or create applicant profile
  if (Object.keys(profileData).length > 0) {
    await prisma.applicantProfile.upsert({
      where: { userId },
      create: {
        userId,
        ...profileData,
        skills: profileData.skills || [],
        education: profileData.education || [],
      },
      update: profileData,
    });
  }

  return await getUserProfile(userId);
};

export const uploadResume = async (userId: string, resumeUrl: string) => {
  // This would typically handle file upload
  // For now, we'll just store the URL
  // In a real implementation, you'd use multer to handle file uploads
  
  // Update user's latest application resume or profile
  // This is a simplified version
  return { resumeUrl, message: 'Resume uploaded successfully' };
};

