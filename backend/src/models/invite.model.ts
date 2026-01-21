import { Schema, model } from 'mongoose';
import { IInvite, UserRole } from '../types';

const inviteSchema = new Schema<IInvite>(
    {
        email: {
            type: String,
            required: [true, 'Invite must have an email'],
            lowercase: true,
            trim: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            required: [true, 'Invite must have a role'],
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        acceptedAt: Date,
    },
    {
        timestamps: true,
    },
);

export const Invite = model<IInvite>('Invite', inviteSchema);
