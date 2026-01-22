import { Project } from '../models/project.model';
import { IProject, ProjectStatus } from '../types';
import { AppError } from '../utils/AppError';
import * as auditService from './audit.service';
import { AuditAction, AuditTargetType } from '../types';

export const createProject = async (data: Partial<IProject>, userId: string) => {
    const project = await Project.create({
        ...data,
        createdBy: userId,
    });
    return project;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllProjects = async (query: any) => {
    // Model middleware automatically handles isDeleted: { $ne: true }
    const projects = await Project.find(query).populate('createdBy', 'name email');
    return projects;
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
    await auditService.logAction(userId, AuditAction.PROJECT_DELETED, AuditTargetType.PROJECT, id);

    return project;
};
