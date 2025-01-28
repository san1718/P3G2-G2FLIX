const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');
mongoose.connect(process.env.OMDb_URI || 'mongodb://127.0.0.1:27017/omdb');

module.exports = mongoose.connection;
