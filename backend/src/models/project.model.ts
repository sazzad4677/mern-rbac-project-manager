import { Schema, model, Query, CallbackError } from 'mongoose';
import { IProject, ProjectStatus } from '../types';

const projectSchema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: [true, 'Project must have a name'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: Object.values(ProjectStatus),
            default: ProjectStatus.ACTIVE,
        },
        isDeleted: {
            type: Boolean,
            default: false,
            select: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Project must belong to a user'],
        },
    },
    {
        timestamps: true,
    },
);

// Soft Delete Middleware
projectSchema.pre(/^find/, function () {
    (this as any).find({ isDeleted: { $ne: true } });
});

export const Project = model<IProject>('Project', projectSchema);
