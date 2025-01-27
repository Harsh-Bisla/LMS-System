const mongoose = require('mongoose');

async function connnectDB(url) {
    await mongoose.connect(url);
}

module.exports = connnectDB;