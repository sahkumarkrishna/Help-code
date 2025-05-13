import express from 'express';
import {register, login, updateProfile, logout} from "../controllers/UserController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").patch(isAuthenticated, updateProfile);
router.route("/logout").get(logout);

export default router;