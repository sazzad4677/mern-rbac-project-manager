import { AuditLog } from '../models/audit.model';
import { AuditAction, AuditTargetType } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logAction = async (performedBy: string, action: string, targetType: string, targetId: string, details?: any) => {
    try {
        await AuditLog.create({
            performedBy,
            action: action as AuditAction,
            targetType: targetType as AuditTargetType,
            targetId,
            details,
        });
    } catch (error) {
        // Fail silently so we don't block the main action
        console.error('Failed to log audit action:', error);
    }
};
