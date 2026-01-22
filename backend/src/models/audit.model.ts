import { Schema, model, Document, Types } from 'mongoose';
import { IAuditLog, AuditAction, AuditTargetType } from '../types';

const auditLogSchema = new Schema<IAuditLog>(
    {
        action: {
            type: String,
            enum: Object.values(AuditAction),
            required: true,
        },
        performedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        targetId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        targetType: {
            type: String,
            enum: Object.values(AuditTargetType),
            required: true,
        },
        details: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    },
);

export const AuditLog = model<IAuditLog>('AuditLog', auditLogSchema);
