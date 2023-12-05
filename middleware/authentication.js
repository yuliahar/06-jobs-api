const User = require('../models/User');
const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  // check if authorization header exists
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  // verify token
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    // const user = await User.findOne({ _id: payload.userId }).select('-password')
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
}

module.exports = auth