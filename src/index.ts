import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import env from './config/env';
import connectDB from './config/db';
dotenv.config();

const app: Application = express();
const PORT = env.PORT;
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));

connectDB();

app.listen(PORT, () => console.log(`App is listening on PORT: ${PORT}`));
