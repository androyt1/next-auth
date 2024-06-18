import bcrypt from "bcrypt";
import prisma from "@/lib/db";

const POST = async (req: Request) => {
    const records = await req.json();
    const { username, email, firstname, lastname, password } = records;
    if (!username || !email || !firstname || !lastname || !password) {
        return Response.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    if (existingUser) {
        return Response.json({ message: "Sorry username is already taken" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email: email,
            username: username,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname,
        },
    });

    return Response.json({ message: "New User Created Successfully" }, { status: 201 });
};

export { POST };
