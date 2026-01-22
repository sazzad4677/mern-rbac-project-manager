import { z } from "zod";
import { ROLES } from "../../config/roles";

export const UserRoleEnum = z.enum(ROLES); 
export const UserStatusEnum = z.enum(["ACTIVE", "PENDING", "INACTIVE"]);

export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.email(),
    role: UserRoleEnum,
    status: UserStatusEnum,
    avatar: z.string().optional(),
});