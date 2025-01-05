import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler';
import moviesRouter from './api/movies';   //import movies router
import authenticate from './authenticate';
import actorsRouter from './api/actors';
import favouritesRouter from './api/favourites';

dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use('/api/movies', authenticate, moviesRouter);
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/favourites', authenticate, favouritesRouter)
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
