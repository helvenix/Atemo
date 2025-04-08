import express from 'express';
const router = express.Router();

import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/tasks.js'
import { auth } from '../middleware/auth.js'

router.use(auth);

router.post('/', createTask);

router.get('/', getTasks);
router.get('/:id', getTaskById);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;