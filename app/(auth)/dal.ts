import "server-only";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";

const prisma = new PrismaClient();

export const getUser = cache(async (userId: string) => {
    if (!userId) return null;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                firstname: true,
                lastname: true,
                email: true,
                username: true,
            },
        });

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error("Failed to fetch user", error);
        return null;
    }
});
