import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/route.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

// accept json body
app.use(express.json({
    limit: '16kb'
}));

// accept urlencoded body
app.use(express.urlencoded({ extended: true, limit: '16kb'}));

//store images in public folder
app.use(express.static('public'));

//cookie parser
app.use(cookieParser());

//routes
app.use('/api/user', userRouter);

export default app;