const mongoose=require('mongoose');

const db = process.env.MY_MONGO_URI;

const connectDB =async()=>{
    try {

        await mongoose.connect(db);
        console.log('MongoDB Connection Successful')
    } catch (err) {
        console.error(err.message);
        console.log('Check .env file')
        process.exit(1)
    }
}
module.exports = connectDB;
