const httpStatus = require('http-status');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');

// get all transactions
const getAllTransactions = async () => {
    return await db.transactions.findAll()
}

module.exports = {
    getAllTransactions,
}