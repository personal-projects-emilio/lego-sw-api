import { Express } from "express";
import cors from 'cors';
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import xss from "xss-clean";

const implementSecurityRules = (app: Express) => {
  // Enable CORS
  app.use(cors());

  // Set security headers
  app.use(helmet());

  // Prevent http param pollution
  app.use(hpp());

  // Sanitize data
  app.use(mongoSanitize());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 50
  });
  app.use(limiter);

  // // Prevent XSS attacks
  app.use(xss());
}

export default implementSecurityRules;