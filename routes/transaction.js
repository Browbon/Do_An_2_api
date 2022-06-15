import express from "express";
import {
  createTransaction,
  getAllTransaction,
  getHotelTransaction,
  getHotelTransactionByMonth,
  getTransaction,
  getUserTransaction,
  getUserTransactionByMonth,
} from "../controllers/transactionController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE TRANSACTION
router.post("/", verifyUser, createTransaction);

//GET ALL TRANSACTIONS
router.get("/", verifyAdmin, getAllTransaction);

//GET ALL TRANSACTION BY MONTH
router.get("/month/:month", verifyAdmin, getTransaction);

//GET USER ALL TRANSACTION
router.get("/user/:userId", verifyAdmin, getUserTransaction);

//GET HOTEL ALL TRANSACTION
router.get("/hotel", verifyAdmin, getHotelTransaction);

//GET USER TRANSACTION BY MONTH
router.get("/:userId/:month", verifyAdmin, getUserTransactionByMonth);

//GET HOTEL TRANSACTION BY MONTH
router.get("/hotel/:hotelName/:month", verifyAdmin, getHotelTransactionByMonth);

export default router;
