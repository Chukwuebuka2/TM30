const axios = require('axios');
const httpStatus = require('http-status');
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

const initializeTransaction = async (details) => {
    const payload = {
        ...details,
        amount: details.amount * 100
    };

    try {
        const res = await apiCall.post('/transaction/initialize', payload);
        const {
            data: { authorization_url },
        } = res.data;

        return authorization_url;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}



module.exports = {
    verifyPayment,
    initializeTransaction
}