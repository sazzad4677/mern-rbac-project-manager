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
projectSchema.pre(/^find/, function (this: object, next: (err?: CallbackError) => void) {
    (this as Query<IProject[], IProject>).find({ isDeleted: { $ne: true } });
    next();
});

export const Project = model<IProject>('Project', projectSchema);
