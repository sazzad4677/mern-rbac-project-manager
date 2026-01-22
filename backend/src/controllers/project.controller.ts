import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import * as projectService from '../services/project.service';

export const create = catchAsync(async (req: Request, res: Response) => {
    const project = await projectService.createProject(req.body, (req.user as any)._id.toString());

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Project created successfully',
        data: project,
    });
});

export const getAll = catchAsync(async (req: Request, res: Response) => {
    const projects = await projectService.getAllProjects(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Projects retrieved successfully',
        data: projects,
    });
});

export const update = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const project = await projectService.updateProject(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Project updated successfully',
        data: project,
    });
});

export const deleteProject = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    await projectService.deleteProject(id, (req.user as any)._id.toString());

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Project deleted successfully',
        data: null,
    });
});
