import express from "express";
import { userDetail, users, editProfile, changePassword } from "../controller/userController";

const userRouter = express.Router(); // 

userRouter.get(routes.users, users);
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(reoutes.changePassword, changePassword);

export default userRouter;
