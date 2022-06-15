import Transaction from "../models/Transaction.js";

const MonthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//CREATE TRANSACTION
export const createTransaction = async (req, res, next) => {
  const newTransaction = new Transaction(req.body);
  try {
    const savedTransaction = await newTransaction.save();
    return res.status(200).json(savedTransaction);
  } catch (error) {
    next(error);
  }
};

//GET TRANSACTION BY MONTH
export const getTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    const list = transactions.filter(
      (item) => MonthList[item.createdAt.getMonth()] === req.params.month
    );
    let total = 0;
    list.map((item) => (total += item.amount));
    return res.status(200).json(total);
  } catch (error) {
    next(error);
  }
};

export const getAllTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getUserTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      customerId: req.params.userId,
    });
    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getHotelTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      hotelName: req.query.hotelName,
    });
    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getUserTransactionByMonth = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      customerId: req.params.userId,
    });

    const totalTransaction = transactions.filter(
      (item) => MonthList[item.createdAt.getMonth()] === req.params.month
    );
    var total = 0;
    totalTransaction.map((item) => (total += item.amount));
    return res.status(200).json(total);
  } catch (error) {
    next(error);
  }
};

export const getHotelTransactionByMonth = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      hotelName: req.params.hotelName,
    });

    const totalTransaction = transactions.filter(
      (item) => MonthList[item.createdAt.getMonth()] === req.params.month
    );
    let total = 0;
    totalTransaction.map((item) => (total += item.amount));
    return res.status(200).json(total);
  } catch (error) {
    next(error);
  }
};
