import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config(); 

import {initDB} from './db/db.js';
import {workoutRoutes} from './routes/workouts.js';
import {userRoutes} from './routes/users.js';
import {PORT} from './constants.js';

app.use(express.json());
app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);

app.listen(PORT, async () => {
  await initDB();
  console.log(`Server started on ${PORT}`);
});
