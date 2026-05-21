import { Elysia, t } from "elysia";
import { userService } from "../services/user-service";

export const userRoute = new Elysia({ prefix: "/users" })
  .post("/", async ({ body, set }) => {
    const result = await userService.registerUser(body);
    
    if (!result.success) {
      set.status = 400;
      return { error: result.error };
    }

    set.status = 201;
    return { data: "OK" };
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  });
