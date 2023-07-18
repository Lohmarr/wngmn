const mongoose = require('mongoose');

// connect and create wingman database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wingman',{useNewURLParser: true, useUnifiedTopology: true});

module.exports = mongoose.connection;
