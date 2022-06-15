import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  getHotelRooms,
  searchByType,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE NEW HOTEL
router.post("/", verifyAdmin, createHotel);

//UPDATE BY ID
router.put("/:id", verifyAdmin, updateHotel);

//DELETE BY ID
router.delete("/:id", verifyAdmin, deleteHotel);

//GET BY ID
router.get("/:id", getHotel);

//GET ALL HOTELS
router.get("/", getAllHotel);
router.get("/count/ByCity", countByCity);
router.get("/count/ByType", countByType);
router.get("/search/ByType", searchByType);
router.get("/room/:id", getHotelRooms);

export default router;
