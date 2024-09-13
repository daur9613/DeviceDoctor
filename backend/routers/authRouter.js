import express from "express";
import {
  Register,
  Login,
  getOneUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controller/authController.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/users", getUsers);
router.get("/users/:id", getOneUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
