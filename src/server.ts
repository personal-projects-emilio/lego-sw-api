import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import mountRouters from 'routes';
import connectDB from 'config/database';
import errorHandler from 'middleware/errorHandler';
import implementSecurityRules from 'utils/security';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, 'config/config.env') })

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Implement basic security rules for the API
implementSecurityRules(app);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
mountRouters(app);

app.use(errorHandler);

const PORT = parseInt(process.env.PORT) || 5000;

app.listen(PORT, () => console.log(chalk.yellow(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)));
