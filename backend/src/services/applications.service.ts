import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';
import * as emailService from './email.service';

export interface CreateApplicationData {
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export const createApplication = async (data: CreateApplicationData, applicantId: string) => {
  // Check if job exists
  const job = await prisma.job.findUnique({
    where: { id: data.jobId },
  });

  if (!job) {
    throw new AppError('Job not found', 404);
  }

  if (job.status !== 'published') {
    throw new AppError('Job is not accepting applications', 400);
  }

  // Check if already applied
  const existing = await prisma.application.findUnique({
    where: {
      jobId_applicantId: {
        jobId: data.jobId,
        applicantId,
      },
    },
  });

  if (existing) {
    throw new AppError('You have already applied for this job', 400);
  }

  // Create application
  const application = await prisma.application.create({
    data: {
      ...data,
      applicantId,
    },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          department: true,
          location: true,
        },
      },
      applicant: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  // Create status history
  await prisma.applicationStatusHistory.create({
    data: {
      applicationId: application.id,
      status: 'pending',
      changedBy: applicantId,
      notes: 'Application submitted',
    },
  });

  // Send email notification
  try {
    await emailService.sendApplicationReceivedEmail(application.applicant.email, job.title);
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }

  return application;
};

export const getApplications = async (filters: {
  userId?: string;
  jobId?: string;
  status?: string;
  page?: number;
  limit?: number;
  userRole?: string;
}) => {
  const { userId, jobId, status, page = 1, limit = 20, userRole } = filters;
  const skip = (page - 1) * limit;

  const where: any = {};

  // If applicant, only show their applications
  if (userRole === 'applicant' && userId) {
    where.applicantId = userId;
  }

  // If HR, show all applications or filter by job
  if (userRole === 'hr' || userRole === 'admin') {
    if (jobId) {
      where.jobId = jobId;
    }
  }

  if (status) {
    where.status = status;
  }

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      skip,
      take: limit,
      orderBy: { appliedAt: 'desc' },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            department: true,
            location: true,
          },
        },
        applicant: {
          select: {
            id: true,
            fullName: true,
            email: true,
            applicantProfile: {
              select: {
                phone: true,
                linkedinUrl: true,
              },
            },
          },
        },
      },
    }),
    prisma.application.count({ where }),
  ]);

  return {
    applications,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getApplicationById = async (id: string, userId: string, userRole: string) => {
  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      job: true,
      applicant: {
        include: {
          applicantProfile: true,
        },
      },
      statusHistory: {
        include: {
          changer: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
        orderBy: { changedAt: 'desc' },
      },
    },
  });

  if (!application) {
    throw new AppError('Application not found', 404);
  }

  // Check permissions
  if (userRole === 'applicant' && application.applicantId !== userId) {
    throw new AppError('Unauthorized', 403);
  }

  if ((userRole === 'hr' || userRole === 'admin') && application.applicantId === userId) {
    // HR viewing their own application - allowed
  } else if (userRole !== 'hr' && userRole !== 'admin' && application.applicantId !== userId) {
    throw new AppError('Unauthorized', 403);
  }

  return application;
};

export const updateApplicationStatus = async (
  id: string,
  status: string,
  userId: string,
  notes?: string
) => {
  const application = await prisma.application.findUnique({
    where: { id },
  });

  if (!application) {
    throw new AppError('Application not found', 404);
  }

  const validStatuses = [
    'pending',
    'shortlisted',
    'rejected',
    'interview_scheduled',
    'offer_extended',
    'hired',
  ];

  if (!validStatuses.includes(status)) {
    throw new AppError('Invalid status', 400);
  }

  // Update application
  const updated = await prisma.application.update({
    where: { id },
    data: { status },
    include: {
      job: {
        select: {
          title: true,
        },
      },
      applicant: {
        select: {
          email: true,
          fullName: true,
        },
      },
    },
  });

  // Create status history
  await prisma.applicationStatusHistory.create({
    data: {
      applicationId: id,
      status: status as any,
      changedBy: userId,
      notes: notes || `Status changed to ${status}`,
    },
  });

  // Send email notification
  try {
    await emailService.sendStatusUpdateEmail(
      updated.applicant.email,
      updated.job.title,
      status
    );
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }

  return updated;
};

export const addApplicationNotes = async (id: string, notes: string, userId: string) => {
  const application = await prisma.application.findUnique({
    where: { id },
  });

  if (!application) {
    throw new AppError('Application not found', 404);
  }

  const updated = await prisma.application.update({
    where: { id },
    data: {
      notes: notes,
    },
  });

  return updated;
};

