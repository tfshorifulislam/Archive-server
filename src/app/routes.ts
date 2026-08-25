import { Express } from "express";

import userNameCheckRouter from "../router/userNameValidation.router.js";
import backendHelthCheck from "../router/health.js";
import profileRouter from "../router/profileRouter.js";
import profileUpdateRouter from "../router/ProfileName.UserName.Update.js";
import createPublicPost from "../router/upload.media.router.js";
import getPublicPost from "../router/get.allPost.router.js";
import getUserPost from "../router/get.userPosts.router.js";
import getUserPostById from "../router/get.Posts_By_Id.js";
import togglePostSaveRouter from "../router/toggleSavePost.router.js";
import checkSavedPost from "../router/CheckSavePost.js";
import savedPostsRouter from "../router/getSavedPosts.js";
import toggleLikePostRouter from "../router/toggleLikePost.router.js";
import checkLikePostRouter from "../router/checkLikePost.router.js";
import searchPostRouter from "../router/searchPost.router.js";

export const setupRoutes = (app: Express) => {

  app.use("/api/posts/search", searchPostRouter);
  
  app.use("/", backendHelthCheck);

  app.use("/api/user", userNameCheckRouter);

  app.use("/api/profile", profileRouter);

  app.use("/api/profile-update", profileUpdateRouter);

  app.use("/api/create", createPublicPost);

  app.use("/api/posts", getPublicPost);

  app.use("/api", getUserPost);

  app.use("/api", getUserPostById);

  app.use("/api/toggle-save", togglePostSaveRouter);

  app.use("/api/toggle-save/check", checkSavedPost);

  app.use("/api/saved-posts", savedPostsRouter);

  app.use("/api/toggle-like", toggleLikePostRouter);

  app.use("/api/toggle-like/check", checkLikePostRouter);


};