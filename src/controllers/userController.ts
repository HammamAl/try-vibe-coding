import { db } from "../db";
import { users } from "../db/schema";

export const userController = {
  getUsers: async () => {
    try {
      const allUsers = await db.select().from(users);
      return allUsers;
    } catch (error) {
      return { error: "Failed to fetch users" };
    }
  },
  createUser: async (body: { name: string; email: string }) => {
    try {
      await db.insert(users).values({
        name: body.name,
        email: body.email,
      });
      return { success: true, message: "User created successfully" };
    } catch (error) {
      return { error: "Failed to create user" };
    }
  }
};
