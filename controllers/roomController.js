import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

//CREATE ROOM
//localhost:8800/api/rooms/:hotelId
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    return res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

//UPDATE BY ID
export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

//AVAILABILITY
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: { "roomNumbers.$.unavailableDates": req.body.dates },
      }
    );
    return res.status(200).json("Room status has been update!");
  } catch (error) {
    next(error);
  }
};

//DELETE BY ID
//localhost:8800/api/rooms/:id/:hotelId
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const deletedRoom = await Room.findById(req.params.id);
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    return res.status(200).json(`${deletedRoom.title} has been deleted!`);
  } catch (error) {
    next(error);
  }
};

//GET BY ID
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    return res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

//GET ALL HOTELS
export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
