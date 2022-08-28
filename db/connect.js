const mongoose = require('mongoose');

const connectDB = (connectionURL) => {
  return mongoose.connect(connectionURL);
};

module.exports = connectDB;
