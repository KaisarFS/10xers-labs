const jwt = require('jsonwebtoken');

const createToken = (payload) => jwt.sign(payload, 'secret');
const decodeToken = (token) => jwt.verify(token, 'secret');

module.exports = { createToken, decodeToken}