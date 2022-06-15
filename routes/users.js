import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE BY ID
router.put("/:id", verifyUser, updateUser);

//DELETE BY ID
router.delete("/:id", verifyUser, deleteUser);

//GET BY ID
router.get("/:id", verifyUser, getUser);

//GET ALL USERS
router.get("/", verifyAdmin, getAllUser);

export default router;
