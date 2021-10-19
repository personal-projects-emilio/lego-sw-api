import express, { Application } from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, 'config/config.env') })

// Connect to database
connectDB();

const app: Application = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = parseInt(process.env.PORT) || 5000;

app.listen(PORT, () => console.log(chalk.yellow(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)));
