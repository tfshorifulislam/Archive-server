import { Express } from "express";
import { toNodeHandler } from "better-auth/node";

import { auth } from "../lib/auth.js";
import userNameCheckRouter from "../router/userNameValidation.router.js";
import backendHelthCheck from "../router/health.js"

export const setupRoutes = (app: Express) => {

  //better auth moutn
  app.all("/api/auth/{*any}", toNodeHandler(auth));

  //health check;
  app.use('/', backendHelthCheck)

  //check user name validation
  app.use("/api/user", userNameCheckRouter);

};