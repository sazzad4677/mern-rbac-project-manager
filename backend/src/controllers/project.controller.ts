/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import * as projectService from '../services/project.service';

export const createProject = catchAsync(async (req: Request, res: Response) => {
    const project = await projectService.createProject(req.body, req.user._id.toString());

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Project created successfully',
        data: project,
    });
});

export const getAllProjects = catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '10', 10);
    const projects = await projectService.getAllProjects(page, limit);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Projects retrieved successfully',
        data: projects,
    });
});

export const updateProject = catchAsync(async (req: Request, res: Response) => {
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
    await projectService.deleteProject(id, req.user._id.toString());

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Project deleted successfully',
        data: null,
    });
});
