import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User } from '../models/user.model';
import { Invite } from '../models/invite.model';
import { AppError } from '../utils/AppError';
import { UserStatus, UserRole } from '../types';
import { signToken } from '../utils/signToken';


export const loginUser = async (email: string, password: string) => {
    // Find user by email and select password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password || '');
    if (!isPasswordCorrect) {
        throw new AppError('Invalid email or password', 401);
    }

    // Check if user is active
    if (user.status === UserStatus.INACTIVE) {
        throw new AppError('Your account has been deactivated.', 403);
    }

    // Generate token and send response
    // eslint-disable-next-line no-underscore-dangle
    const token = signToken(user._id.toString());

    // Remove password from output
    user.password = undefined;

    return { user, token };
};

export const createInvite = async (email: string, role: string) => {
    // Check if an Active User already exists with this email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError('User is already registered', 409);
    }

    // Check if an Invite already exists with this email
    const existingInvite = await Invite.findOne({ email });

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    if (existingInvite) {
        // Case A: Existing Invite is Valid
        if (existingInvite.expiresAt > new Date()) {
            throw new AppError('A valid invite is already pending for this email', 409);
        }

        // Case B: Existing Invite is Expired -> Update it (Re-Invite)
        existingInvite.token = token;
        existingInvite.expiresAt = expiresAt;
        existingInvite.role = role as UserRole; // Update role if changed
        await existingInvite.save();

        return existingInvite.token;
    }

    // Case C: No Invite -> Create new
    const invite = await Invite.create({
        email,
        role,
        token,
        expiresAt,
    });

    return invite.token;
};

export const registerUserViaInvite = async (token: string, name: string, password: string) => {
    // Find invite
    const invite = await Invite.findOne({ token });

    if (!invite) {
        throw new AppError('Invalid invite token', 400);
    }

    // Strict Expiration Check
    if (invite.expiresAt < new Date()) {
        throw new AppError('This invite link has expired. Please ask for a new one.', 400);
    }

    // Check if already used
    if (invite.acceptedAt) {
        throw new AppError('Invite already used', 400);
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
        name,
        email: invite.email,
        password: hashedPassword,
        role: invite.role,
        status: UserStatus.ACTIVE,
        invitedAt: invite.createdAt,
    });

    // Mark invite as accepted
    invite.acceptedAt = new Date();
    await invite.save();

    return { user };
};
