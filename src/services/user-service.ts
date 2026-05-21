import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const userService = {
  registerUser: async (body: { name: string; email: string; password: string }) => {
    // 1. Pengecekan ketersediaan email
    const existingUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1);
    
    if (existingUser.length > 0) {
      return { success: false, error: "Email sudah terdaftar" };
    }

    // 2. Hashing Password menggunakan Bun.password bawaan (Bcrypt secara default)
    const passwordHash = await Bun.password.hash(body.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    // 3. Simpan ke database
    await db.insert(users).values({
      name: body.name,
      email: body.email,
      password: passwordHash,
    });

    return { success: true };
  },
};
