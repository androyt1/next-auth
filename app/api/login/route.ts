import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const POST = async (req: Request) => {
    const records = await req.json();
    const { username, password } = records;
    if (!username || !password) {
        return NextResponse.json({ message: "Username and password is required" }, { status: 400 });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!existingUser) {
            return NextResponse.json(
                { message: "Username or password is incorrect" },
                { status: 400 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { message: "Username or password is incorrect" },
                { status: 400 }
            );
        }

        const usernameMatch = username === existingUser.username;

        if (usernameMatch && passwordMatch) {
            const userId = existingUser.id;
            return NextResponse.json({ userId, succes: true }, { status: 200 });
        } else {
            return NextResponse.json(
                { message: "Authentication failed", success: false },
                { status: 400 }
            );
        }
    } catch (error) {
        return NextResponse.json({ message: "Authentication failed", error }, { status: 400 });
    }
};

export { POST };
