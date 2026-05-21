import { Elysia } from "elysia";
import { userRoute } from "./routes/user-route";

const app = new Elysia()
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  .group("/api", (app) => app.use(userRoute))
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
