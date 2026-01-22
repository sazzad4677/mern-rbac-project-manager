import { Document, Types } from 'mongoose';

export enum UserRole {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    STAFF = 'STAFF',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export enum ProjectStatus {
    ACTIVE = 'ACTIVE',
    ARCHIVED = 'ARCHIVED',
    DELETED = 'DELETED',
}

export enum AuditAction {
    PROJECT_DELETED = 'PROJECT_DELETED',
    ROLE_UPDATED = 'ROLE_UPDATED',
    USER_STATUS_UPDATED = 'USER_STATUS_UPDATED',
    PROJECT_CREATED = 'PROJECT_CREATED',
}

export enum AuditTargetType {
    PROJECT = 'PROJECT',
    USER = 'USER',
}

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    status: UserStatus;
    invitedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IInvite extends Document {
    email: string;
    token: string;
    role: UserRole;
    expiresAt: Date;
    acceptedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProject extends Document {
    name: string;
    description?: string;
    status: ProjectStatus;
    isDeleted: boolean;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAuditLog extends Document {
    action: AuditAction;
    performedBy: Types.ObjectId;
    targetId: Types.ObjectId;
    targetType: AuditTargetType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any;
    createdAt: Date;
}