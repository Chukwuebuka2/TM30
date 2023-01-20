const axios = require('axios');
const httpStatus = require('http-status');
const banks = require('../utils/banks');
const { secret } = require('../config/config').paystack;
const ApiError = require('../utils');

const apiCall = axios.create({
    baseURL: 'https://api.paystack.co',
    headers: { authorization: `Bearer ${secret}` }
});

/**
 * verify payment transaction
 * @param {ObjectId} reference 
 * @returns { Promise <paymentStatus> }
 */
const verifyPayment = async (reference) => {
    try {
        const res = await apiCall.get(`transaction/verify/${reference}`);
        const {
            data: { id, status, gateway_response },
        } = res.data;

        const response = { id, status, gateway_response };
        return response;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}



module.exports = {
    verifyPayment
}