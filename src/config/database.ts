import { connect } from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  const conn = await connect(process.env.MONGO_URI, {
  })

  console.log('MongoDB Connected: ', chalk.cyan(conn.connection.host));
}

export default connectDB;