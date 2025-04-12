import express from 'express';
const router = express.Router();

import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
} from '../controllers/events.js'
import { auth } from '../middleware/auth.js'

router.use(auth);

router.post('/', createEvent);

router.get('/', getEvents);
router.get('/:id', getEventById);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

export default router;