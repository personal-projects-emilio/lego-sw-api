import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI, {
  })

  console.log('MongoDB Connected: ', chalk.cyan(connect.connection.host));
}

export default connectDB;