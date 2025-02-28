import mongoose from 'mongoose';
// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');
export default mongoose.connection;
