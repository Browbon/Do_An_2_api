import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    hotelName: { type: String, required: true },
    customerId: { type: String, required: true },
    date: { type: Date },
    amount: { type: Number, required: true },
    roomName: { type: [String] },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
