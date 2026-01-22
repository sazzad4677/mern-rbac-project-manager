import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import { User } from "../models/user.model";

// Load environment variables
dotenv.config();

// Configuration
const MONGO_URI = process.env.MONGO_URI as string;
const SALT_ROUNDS = 10;
const TOTAL_USERS = 20; // How many staff/managers to create

// Mock Data Generators
const roles = ["MANAGER", "STAFF"] as const;
const statuses = ["ACTIVE", "INACTIVE"] as const;

const seedDatabase = async () => {
    try {
        console.log("🌱 Connecting to database...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected.");

        // Create the Super Admin
        const adminPassword = await bcrypt.hash("admin123", SALT_ROUNDS);

        const adminUser = {
            name: "Super Admin",
            email: "admin@example.com",
            password: adminPassword,
            role: "ADMIN",
            status: "ACTIVE",
            createdAt: new Date(),
            invitedAt: new Date()
        };

        // Check if admin exists to avoid duplicates
        const existingAdmin = await User.findOne({ email: adminUser.email });
        if (!existingAdmin) {
            await User.create(adminUser);
            console.log("👑 Admin created: admin@example.com / admin123");
        } else {
            console.log("⚠️  Admin already exists, skipping...");
        }

        // Generate Bulk Users
        const bulkUsers = [];

        for (let i = 1; i <= TOTAL_USERS; i++) {
            const role = roles[Math.floor(Math.random() * roles.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const password = await bcrypt.hash("password123", SALT_ROUNDS);

            bulkUsers.push({
                name: `User ${i}`,
                email: `user${i}@example.com`,
                password: password,
                role: role,
                status: status,
                createdAt: new Date(),
                invitedAt: new Date(),
            });
        }

        // Insert Bulk Users
        if (bulkUsers.length > 0) {
            await User.insertMany(bulkUsers);
            console.log(`🚀 Successfully seeded ${bulkUsers.length} users.`);
        }

        console.log("✅ Seeding complete.");
        process.exit(0);

    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedDatabase();