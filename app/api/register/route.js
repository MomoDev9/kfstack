import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const saltRounds = 10;
export async function POST(req) {
  const { name, email, password } = await req.json();
  console.log("Received data:", { name, email, password });

  try {
    if (!name || !email || !password) {
      throw new Error("Missing required fields");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ "Error creating user": error }), {
      status: 500,
    });
  }
}
