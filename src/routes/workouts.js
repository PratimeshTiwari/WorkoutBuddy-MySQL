import express from 'express';
import {getWorkouts,getSingleWorkout,addWorkouts,updateWorkouts,deleteWorkout} from '../controllers/controllers.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/',getWorkouts);
router.get('/:id',getSingleWorkout)
router.post('/',addWorkouts);
router.patch('/:id',deleteWorkout);
router.patch('/:id',updateWorkouts);

export const workoutRoutes = router;