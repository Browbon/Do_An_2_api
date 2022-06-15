import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE ROOM
router.post("/:hotelId", verifyAdmin, createRoom);

// UPDATE ROOM
router.put("/:id", verifyAdmin, updateRoom);

//UPDATE AVAILABILITY ROOM
router.put("/availability/:id", updateRoomAvailability);

// DELETE ROOM
// localhost:8800/api/rooms/:id/:hotelId
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

// GET ROOM
router.get("/:id", getRoom);

// GET ALL ROOMS
router.get("/", getAllRoom);

export default router;
