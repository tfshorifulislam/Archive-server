import { Express } from "express";
import { toNodeHandler } from "better-auth/node";

import { auth } from "../lib/auth.js";
import userNameCheckRouter from "../router/userNameValidation.router.js";
import backendHelthCheck from "../router/health.js"
import authRouter from "../router/authSessionCheck.js"
import profileRouter from "../router/profileRouter.js";
import profileUpdateRouter from "../router/ProfileName.UserName.Update.js";
import createPublicPost from "../router/upload.media.router.js";
import getPublicPost from "../router/get.allPost.router.js";

export const setupRoutes = (app: Express) => {

  //better auth moutn
  app.all("/api/auth/{*any}", toNodeHandler(auth));

  //health check;
  app.use('/', backendHelthCheck)

  // session check;
  app.use("/api/session", authRouter);

  //check user name validation
  app.use("/api/user", userNameCheckRouter);

  //public profile;
  app.use('/api/profile', profileRouter);

  //public profile update route;
  app.use("/api/profile-update", profileUpdateRouter);

  //create public post
  app.use("/api/create", createPublicPost);

  //get all public post
  app.use("/api/posts", getPublicPost);


};