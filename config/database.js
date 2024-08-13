const mongoose = require('mongoose');

async function connectDB() {
    try {
        const connectInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(connectInstance.connection.host);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;