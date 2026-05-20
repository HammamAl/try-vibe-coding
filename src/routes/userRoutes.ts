import { Elysia, t } from "elysia";
import { userController } from "../controllers/userController";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", () => userController.getUsers())
  .post("/", ({ body }) => userController.createUser(body), {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" }),
    }),
  });
