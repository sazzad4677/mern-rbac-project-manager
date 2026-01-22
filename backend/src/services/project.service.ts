import { Project } from '../models/project.model';
import {
  IProject,
  ProjectStatus,
  AuditAction,
  AuditTargetType,
} from '../types';
import { AppError } from '../utils/AppError';
import * as auditService from './audit.service';

export const createProject = async (
  data: Partial<IProject>,
  userId: string,
) => {
  const project = await Project.create({
    ...data,
    createdBy: userId,
  });

  // Capture Audit Log
  await auditService.logAction(
    userId,
    AuditAction.PROJECT_CREATED,
    AuditTargetType.PROJECT,
    project._id.toString(),
    { name: project.name },
  );

  return project;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllProjects = async (
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;
  const projects = await Project.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('createdBy', 'name email');
  const total = await Project.countDocuments();

  return {
    projects,
    total,
    page,
    limit,
  };
};

export const updateProject = async (id: string, data: Partial<IProject>) => {
  const project = await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  return project;
};

export const deleteProject = async (id: string, userId: string) => {
  // Soft delete: set isDeleted to true and status to DELETED
  const project = await Project.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
      status: ProjectStatus.DELETED,
    },
    { new: true },
  );

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  // Capture Audit Log
  await auditService.logAction(
    userId,
    AuditAction.PROJECT_DELETED,
    AuditTargetType.PROJECT,
    id,
  );

  return project;
};
